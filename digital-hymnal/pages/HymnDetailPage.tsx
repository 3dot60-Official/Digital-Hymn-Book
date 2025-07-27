import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hymn } from '../types';
import { hymnService } from '../services/hymnService';
import CategoryPill from '../components/CategoryPill';
import AudioPlayer from '../components/AudioPlayer';
import { ArrowLeftIcon, ShareIcon, HeartIcon } from '../components/icons/Icons';
import { LanguageContext } from '../context/LanguageContext';
import { useLikes } from '../context/LikesContext';

const HymnDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hymn, setHymn] = useState<Hymn | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const { language } = useContext(LanguageContext);
  const { isLiked, toggleLike } = useLikes();

  useEffect(() => {
    const fetchHymn = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await hymnService.getHymnById(parseInt(id, 10));
        if (data) {
          setHymn(data);
        } else {
          setError("Hymn not found.");
        }
      } catch (e) {
        setError("Failed to load hymn details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHymn();
  }, [id]);
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess('Link copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy link.');
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading hymn...</div>;
  }
  if (error) {
    return <div className="text-center py-10 bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>;
  }
  if (!hymn) {
    return null;
  }

  const currentTitle = hymn.title[language] || hymn.title.en;
  const currentLyrics = hymn.lyrics[language] || hymn.lyrics.en;

  return (
    <div>
      <Link to="/hymns" className="inline-flex items-center gap-2 text-brand-blue-700 hover:text-brand-blue-900 font-medium mb-6">
        <ArrowLeftIcon className="h-5 w-5" />
        Back to Hymn List
      </Link>
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <div>
            <CategoryPill category={hymn.category} />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {hymn.number}. {currentTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
             <button 
                onClick={() => hymn && toggleLike(hymn)} 
                className="p-2 rounded-full hover:bg-red-100 transition-colors" 
                aria-label={isLiked(hymn) ? `Unlike ${currentTitle}` : `Like ${currentTitle}`}
              >
                <HeartIcon className={`h-7 w-7 ${isLiked(hymn) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`} filled={isLiked(hymn)} />
              </button>
              <button onClick={handleShare} className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full transition-colors">
                <ShareIcon className="h-5 w-5" />
                Share
              </button>
          </div>
        </div>
         {copySuccess && <div className="mb-4 text-center text-sm text-green-700 bg-green-100 p-2 rounded-md">{copySuccess}</div>}

        {hymn.audioUrl && (
          <div className="my-6">
            <AudioPlayer src={hymn.audioUrl} />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
          {currentLyrics}
        </div>
      </div>
    </div>
  );
};

export default HymnDetailPage;