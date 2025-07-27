import React, { useState, useCallback, useContext } from 'react';
import { Category } from '../types';
import { generateInspiration } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/Icons';
import CategoryPill from '../components/CategoryPill';
import { LanguageContext } from '../context/LanguageContext';

const InspirationPage: React.FC = () => {
  const [inspiration, setInspiration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Praise);
  const { language } = useContext(LanguageContext);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setInspiration('');
    try {
      const result = await generateInspiration(selectedCategory, language);
      setInspiration(result);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, language]);

  const allCategories = Object.values(Category);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <SparklesIcon className="h-16 w-16 mx-auto text-brand-gold-500" />
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-4">Daily Inspiration</h1>
        <p className="mt-2 text-gray-600">
          Select a theme and generate a short, uplifting message to brighten your day.
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose a theme:</label>
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all border-2 ${selectedCategory === cat ? 'bg-brand-blue-600 text-white border-brand-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-brand-blue-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-brand-gold-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-gold-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
             <>
              <SparklesIcon className="h-5 w-5" />
              Generate Inspiration
             </>
          )}
        </button>
      </div>

      {(inspiration || error) && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          {error && <p className="text-red-600">{error}</p>}
          {inspiration && (
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">A Moment of {selectedCategory}</h3>
              <p className="text-gray-700 leading-relaxed">{inspiration}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InspirationPage;