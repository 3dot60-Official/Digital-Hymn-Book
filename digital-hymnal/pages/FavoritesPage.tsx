import React from 'react';
import { Link } from 'react-router-dom';
import { useLikes } from '../context/LikesContext';
import { useHymns } from '../hooks/useHymns';
import { LanguageContext } from '../context/LanguageContext';
import CategoryPill from '../components/CategoryPill';
import { HeartIcon } from '../components/icons/Icons';
import { Hymn } from '../types';

const FavoritesPage: React.FC = () => {
  const { hymns, isLoading } = useHymns();
  const { getLikedHymns, getLikedGeneratedHymns, toggleLike, isLiked } = useLikes();
  const { language } = React.useContext(LanguageContext);
  
  const likedPredefinedHymns = getLikedHymns(hymns);
  const likedGeneratedHymns = getLikedGeneratedHymns();

  const allLikedItems = [
      ...likedPredefinedHymns, 
      ...likedGeneratedHymns
  ];

  if (isLoading) {
    return <div className="text-center py-10"><p className="text-lg text-gray-600">Loading favorites...</p></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Hymns</h1>
      {allLikedItems.length === 0 ? (
        <p className="text-gray-600">You haven't liked any hymns yet. Click the heart icon on a hymn to add it to your favorites.</p>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Hymnal Collection</h2>
          {likedPredefinedHymns.length > 0 ? likedPredefinedHymns.map(hymn => (
            <div key={`predefined-${hymn.id}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <Link to={`/hymns/${hymn.id}`} className="flex-grow">
                    <p className="font-semibold text-brand-blue-900">{hymn.number}. {hymn.title[language] || hymn.title.en}</p>
                    <CategoryPill category={hymn.category} className="mt-1" />
                </Link>
                <button onClick={() => toggleLike(hymn)} aria-label={`Unlike ${hymn.title[language] || hymn.title.en}`}>
                    <HeartIcon className="h-6 w-6 text-red-500" filled={isLiked(hymn)} />
                </button>
            </div>
          )) : <p className="text-gray-500 italic">No liked hymns from the main collection.</p>}
          
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mt-8">AI-Generated Hymns</h2>
          {likedGeneratedHymns.length > 0 ? likedGeneratedHymns.map((hymn, index) => (
             <div key={`generated-${index}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div className="flex-grow">
                    <p className="font-semibold text-brand-blue-900">{hymn.title}</p>
                    <p className="text-sm text-gray-500 mt-1 whitespace-pre-wrap truncate">{(hymn.lyrics).substring(0, 80)}...</p>
                </div>
                <button onClick={() => toggleLike(hymn)} aria-label={`Unlike ${hymn.title}`}>
                    <HeartIcon className="h-6 w-6 text-red-500" filled={isLiked(hymn)} />
                </button>
            </div>
          )) : <p className="text-gray-500 italic">No liked AI-generated hymns.</p>}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
