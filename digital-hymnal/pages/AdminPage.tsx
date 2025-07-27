import React, { useState, useCallback, useContext } from 'react';
import { Category } from '../types';
import { generateHymn } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/Icons';
import { LanguageContext } from '../context/LanguageContext';

const AdminPage: React.FC = () => {
  const [hymnData, setHymnData] = useState({
    number: '',
    title: '',
    category: Category.Praise,
    lyrics: '',
    audioUrl: ''
  });

  const [topic, setTopic] = useState('God\'s Grace');
  const [generatedHymn, setGeneratedHymn] = useState({ title: '', lyrics: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const { language } = useContext(LanguageContext);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHymnData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setGenerationError('');
    setGeneratedHymn({ title: '', lyrics: '' });
    try {
      const result = await generateHymn(topic, language);
      if(result.lyrics && result.title !== "Error") {
        setGeneratedHymn(result);
      } else {
        setGenerationError(result.lyrics || "Failed to generate hymn.");
      }
    } catch (err) {
      setGenerationError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [topic, language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a demo. Form submission is not implemented.");
  };
  
  const copyToForm = () => {
    setHymnData(prev => ({
        ...prev,
        title: generatedHymn.title,
        lyrics: generatedHymn.lyrics
    }));
  };

  const clearForm = () => {
    setHymnData({
        number: '',
        title: '',
        category: Category.Praise,
        lyrics: '',
        audioUrl: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Total Hymns</h3>
              <p className="text-3xl font-bold text-brand-blue-800">20</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Last Updated</h3>
              <p className="text-xl font-bold text-gray-700">Jan 29, 2023</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Audio Files</h3>
              <p className="text-3xl font-bold text-brand-blue-800">20</p>
          </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-brand-gold-500" />
          AI Hymn Generation
        </h2>
        <p className="text-sm text-gray-500 mb-6">Generate new hymn lyrics from a topic using AI.</p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="hymnTopic" className="block text-sm font-medium text-gray-700">Hymn Topic</label>
            <input 
              type="text" 
              id="hymnTopic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" placeholder="e.g., God's Grace" 
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-brand-gold-700 transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate Lyrics with AI'}
          </button>
          
          {generatedHymn.lyrics && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Generated Hymn:</label>
              <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                <h4 className="font-bold">{generatedHymn.title}</h4>
                <p className="whitespace-pre-wrap mt-2">{generatedHymn.lyrics}</p>
              </div>
              <button 
                type="button" 
                onClick={copyToForm}
                className="mt-2 px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Copy to Form
              </button>
            </div>
          )}
           {generationError && <p className="text-red-600 text-sm">{generationError}</p>}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add / Edit Hymn</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="hymnNumber" className="block text-sm font-medium text-gray-700">Hymn Number</label>
              <input type="number" id="hymnNumber" name="number" value={hymnData.number} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" placeholder="e.g., 142" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="hymnTitle" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="hymnTitle" name="title" value={hymnData.title} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" placeholder="e.g., How Great Thou Art" />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" name="category" value={hymnData.category} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm rounded-md">
              {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="lyrics" className="block text-sm font-medium text-gray-700">Lyrics</label>
            <textarea id="lyrics" name="lyrics" rows={10} value={hymnData.lyrics} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" placeholder="Enter hymn lyrics here..."></textarea>
          </div>

          <div>
            <label htmlFor="audioUrl" className="block text-sm font-medium text-gray-700">Audio File URL (Optional)</label>
            <input type="text" id="audioUrl" name="audioUrl" value={hymnData.audioUrl} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" placeholder="https://example.com/audio.mp3" />
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={clearForm} className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">
              Clear
            </button>
            <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">
              Save Hymn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;