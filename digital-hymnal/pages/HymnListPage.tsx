import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useHymns } from '../hooks/useHymns';
import { Category, GeneratedHymn, Hymn, Language } from '../types';
import CategoryPill from '../components/CategoryPill';
import { ChevronDownIcon, SparklesIcon, HeartIcon } from '../components/icons/Icons';
import { LanguageContext } from '../context/LanguageContext';
import { searchAndGenerateHymn } from '../services/geminiService';
import { useLikes } from '../context/LikesContext';
import { useTranslatedContent } from '../hooks/useTranslatedContent';


interface HymnListPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const HymnRow: React.FC<{hymn: Hymn}> = ({ hymn }) => {
    const { language } = useContext(LanguageContext);
    const { isLiked, toggleLike } = useLikes();
    const { text: translatedTitle } = useTranslatedContent(hymn.title, hymn.title.en || '');
    const { text: translatedLyrics } = useTranslatedContent(hymn.lyrics, hymn.lyrics.en || '');

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-brand-blue-50 transition-all">
            <Link to={`/hymns/${hymn.id}`} className="flex-grow">
                <p className="font-semibold text-brand-blue-900">{hymn.number}. {translatedTitle}</p>
                <p className="text-sm text-gray-500 hidden md:block">{translatedLyrics.substring(0, 80)}...</p>
                <CategoryPill category={hymn.category} className="mt-2" />
            </Link>
            <button 
                onClick={(e) => { e.preventDefault(); toggleLike(hymn); }} 
                className="p-2 rounded-full hover:bg-red-100" 
                aria-label={`Like ${translatedTitle}`}
            >
                <HeartIcon className={`h-6 w-6 ${isLiked(hymn) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`} filled={isLiked(hymn)} />
            </button>
        </div>
    );
};

const HymnListPage: React.FC<HymnListPageProps> = ({ searchTerm, setSearchTerm }) => {
  const { hymns, isLoading, error } = useHymns();
  const { language } = useContext(LanguageContext);
  const { isLiked, toggleLike } = useLikes();
  const location = useLocation();
  const navigate = useNavigate();

  const [aiHymn, setAiHymn] = useState<GeneratedHymn | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') as Category | null;
  const initialSearch = queryParams.get('search') as string | null;

  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory || 'all');

  useEffect(() => {
    setSearchTerm(initialSearch || '');
  }, [initialSearch, setSearchTerm])
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Category | 'all';
    setSelectedCategory(newCategory);
    if (newCategory === 'all') {
        navigate('/hymns');
    } else {
        navigate(`/hymns?category=${encodeURIComponent(newCategory)}`);
    }
  }

  const filteredHymns = useMemo(() => {
    return hymns
      .filter(hymn => {
        const categoryMatch = selectedCategory === 'all' || hymn.category === selectedCategory;
        
        if (!categoryMatch) return false;

        if (!searchTerm) return true;

        const lowerSearchTerm = searchTerm.toLowerCase();

        // Check original English content
        if (hymn.title.en?.toLowerCase().includes(lowerSearchTerm) || hymn.number.toString().includes(lowerSearchTerm)) {
            return true;
        }

        // Check other languages if they exist
        for (const lang in hymn.title) {
            if (hymn.title[lang as Language]?.toLowerCase().includes(lowerSearchTerm)) {
                return true;
            }
        }
        
        return false;
      });
  }, [hymns, selectedCategory, searchTerm]);

  const handleGenerateHymn = useCallback(async () => {
    if (!searchTerm) return;
    setIsAiLoading(true);
    setAiError('');
    setAiHymn(null);
    try {
      const result = await searchAndGenerateHymn(searchTerm, language);
      if (result && result.lyrics) {
        setAiHymn(result);
      } else {
        setAiError("The AI couldn't generate a hymn for this topic. Please try another.");
      }
    } catch (e) {
      setAiError("An error occurred while generating the hymn.");
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  }, [searchTerm, language]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-10"><p className="text-lg text-gray-600">Loading hymns...</p></div>;
    }
    if (error) {
      return <div className="text-center py-10 bg-red-50 text-red-700 p-4 rounded-lg"><p>{error}</p></div>;
    }
    if (filteredHymns.length > 0) {
      return (
        <div className="space-y-3">
          {filteredHymns.map(hymn => <HymnRow key={hymn.id} hymn={hymn} />)}
        </div>
      );
    }
    if (searchTerm) {
        return (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-lg text-gray-600">No hymns found for "{searchTerm}".</p>
                <p className="text-sm text-gray-500 mt-2">Would you like us to write one for you?</p>
                <button
                    onClick={handleGenerateHymn}
                    disabled={isAiLoading}
                    className="mt-4 inline-flex items-center gap-2 bg-brand-gold-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-brand-gold-700 transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-400"
                >
                    <SparklesIcon className="h-5 w-5" />
                    {isAiLoading ? 'Generating with AI...' : `Generate Hymn about "${searchTerm}"`}
                </button>
                {aiHymn && (
                    <div className="mt-6 text-left p-4 bg-gray-50 rounded-md border">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xl text-gray-800">{aiHymn.title}</h3>
                          <button onClick={() => toggleLike(aiHymn)} aria-label={`Like ${aiHymn.title}`}>
                                <HeartIcon className={`h-6 w-6 ${isLiked(aiHymn) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`} filled={isLiked(aiHymn)} />
                          </button>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-gray-700">{aiHymn.lyrics}</p>
                    </div>
                )}
                {aiError && <p className="mt-4 text-red-600">{aiError}</p>}
            </div>
        );
    }
    return (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-600">No hymns match the selected category.</p>
        </div>
    )
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">All Hymns</h1>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="appearance-none w-full md:w-auto bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
          >
            <option value="all">All Categories</option>
            {Object.values(Category).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-5 w-5 text-gray-500 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default HymnListPage;