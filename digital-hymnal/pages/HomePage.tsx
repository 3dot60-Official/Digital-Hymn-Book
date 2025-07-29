import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Category, Hymn } from '../types';
import CategoryPill from '../components/CategoryPill';
import { hymnService } from '../services/hymnService';
import { BookOpenIcon, HeartIcon } from '../components/icons/Icons';
import { LanguageContext } from '../context/LanguageContext';
import AiHymnGenerator from '../components/AiHymnGenerator';
import { useLikes } from '../context/LikesContext';
import { useTranslatedContent } from '../hooks/useTranslatedContent';


const HymnTile: React.FC<{ hymn: Hymn }> = ({ hymn }) => {
    const { isLiked, toggleLike } = useLikes();
    const { text: translatedTitle } = useTranslatedContent(hymn.title, hymn.title.en || 'Untitled');
    
    return (
        <div className="relative bg-white p-4 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
            <Link to={`/hymns/${hymn.id}`} className="block">
                <p className="font-semibold text-brand-blue-800 truncate">{hymn.number}. {translatedTitle}</p>
                <CategoryPill category={hymn.category} className="mt-2"/>
            </Link>
            <button 
                onClick={() => toggleLike(hymn)} 
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 hover:bg-red-100/80 transition-colors opacity-0 group-hover:opacity-100"
                aria-label={`Like ${translatedTitle}`}
            >
                <HeartIcon className={`h-5 w-5 ${isLiked(hymn) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`} filled={isLiked(hymn)} />
            </button>
        </div>
    );
};


const HomePage: React.FC = () => {
  const [recentHymns, setRecentHymns] = useState<Hymn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      setIsLoading(true);
      const hymns = await hymnService.getRecentHymns(4);
      setRecentHymns(hymns);
      setIsLoading(false);
    };
    fetchRecent();
  }, []);

  const handleCategoryClick = (category: Category) => {
    navigate(`/hymns?category=${encodeURIComponent(category)}`);
  };
  
  const featuredCategories = [Category.Christmas, Category.EasterAndAscension, Category.Praise, Category.Guidance, Category.Advent, Category.LentAndCross];

  return (
    <div className="space-y-12">
      <section className="text-center bg-white p-8 rounded-xl shadow-md">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-blue-900">Welcome to Your Digital Hymnal</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A place of worship and praise, based on The Open Hymnal. Find your favorite hymns, discover new ones, and lift your voice in song.
        </p>
        <Link 
          to="/hymns" 
          className="mt-8 inline-flex items-center gap-2 bg-brand-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-blue-800 transition-transform transform hover:scale-105 shadow-lg"
        >
          <BookOpenIcon className="h-5 w-5" />
          Browse All Hymns
        </Link>
      </section>

      <AiHymnGenerator />

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {featuredCategories.map(cat => (
            <CategoryPill key={cat} category={cat} onClick={() => handleCategoryClick(cat)} className="text-sm px-4 py-2 cursor-pointer" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recently Added</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentHymns.map(hymn => <HymnTile key={hymn.id} hymn={hymn} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
