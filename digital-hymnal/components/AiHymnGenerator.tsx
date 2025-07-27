import React, { useState, useCallback, useContext } from 'react';
import { generateHymn } from '../services/geminiService';
import { SparklesIcon, HeartIcon } from './icons/Icons';
import { GeneratedHymn } from '../types';
import { useLikes } from '../context/LikesContext';
import { LanguageContext } from '../context/LanguageContext';

const AiHymnGenerator: React.FC = () => {
  const [topic, setTopic] = useState("God's unending grace");
  const [generatedHymn, setGeneratedHymn] = useState<GeneratedHymn | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isLiked, toggleLike } = useLikes();
  const { language } = useContext(LanguageContext);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedHymn(null);
    try {
      const result = await generateHymn(topic, language);
      if (result && result.lyrics && result.title !== "Error") {
        setGeneratedHymn(result);
      } else {
        setError(result.lyrics || "Could not generate a hymn. Please try another topic.");
      }
    } catch (err) {
      setError('An unexpected error occurred while generating the hymn.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, language]);

  return (
    <section className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div className="text-center">
        <SparklesIcon className="h-12 w-12 mx-auto text-brand-gold-500" />
        <h2 className="font-serif text-3xl font-bold text-gray-800 mt-2">AI Hymn Writer</h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">Feeling inspired? Enter a topic and let our AI assistant compose a new hymn for you.</p>
      </div>
      <div className="mt-6 max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic, e.g., 'Morning Praise'"
            className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-shadow"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 bg-brand-gold-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-brand-gold-700 transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Writing...' : 'Create Hymn'}
          </button>
        </div>
      </div>
       {(isLoading || error || generatedHymn) && (
        <div className="mt-6 max-w-lg mx-auto p-4 bg-gray-50 rounded-lg border">
            {isLoading && <p className="text-gray-600">The AI is composing your hymn...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {generatedHymn && (
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-gray-800">{generatedHymn.title}</h3>
                         <button onClick={() => toggleLike(generatedHymn)} aria-label={`Like ${generatedHymn.title}`}>
                             <HeartIcon className={`h-6 w-6 ${isLiked(generatedHymn) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`} filled={isLiked(generatedHymn)} />
                        </button>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-gray-700">{generatedHymn.lyrics}</p>
                </div>
            )}
        </div>
      )}
    </section>
  );
};

export default AiHymnGenerator;