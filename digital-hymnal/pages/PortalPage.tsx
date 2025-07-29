import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLikes } from '../context/LikesContext';
import { useHymns } from '../hooks/useHymns';
import { LanguageContext } from '../context/LanguageContext';
import CategoryPill from '../components/CategoryPill';
import { HeartIcon, SparklesIcon } from '../components/icons/Icons';
import { Category, GeneratedHymn, Hymn } from '../types';
import { generateHymn } from '../services/geminiService';
import { useTranslatedContent } from '../hooks/useTranslatedContent';

const FavoritesView: React.FC = () => {
    const { hymns, isLoading } = useHymns();
    const { getLikedHymns, getLikedGeneratedHymns, toggleLike, isLiked } = useLikes();
    
    const likedPredefinedHymns = getLikedHymns(hymns);
    const likedGeneratedHymns = getLikedGeneratedHymns();

    if (isLoading) {
        return <div className="text-center py-10"><p className="text-lg text-gray-600">Loading favorites...</p></div>;
    }

    const LikedHymnRow: React.FC<{ hymn: Hymn }> = ({ hymn }) => {
        const { text: translatedTitle } = useTranslatedContent(hymn.title, hymn.title.en || '');
        return (
             <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <Link to={`/hymns/${hymn.id}`} className="flex-grow">
                    <p className="font-semibold text-brand-blue-900">{hymn.number}. {translatedTitle}</p>
                    <CategoryPill category={hymn.category} className="mt-1" />
                </Link>
                <button onClick={() => toggleLike(hymn)} aria-label={`Unlike ${translatedTitle}`}>
                    <HeartIcon className="h-6 w-6 text-red-500" filled={isLiked(hymn)} />
                </button>
            </div>
        )
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Hymnal Collection</h2>
                <div className="space-y-3 mt-4">
                    {likedPredefinedHymns.length > 0 ? likedPredefinedHymns.map(hymn => <LikedHymnRow key={`predefined-${hymn.id}`} hymn={hymn} />) : <p className="text-gray-500 italic">No liked hymns from the main collection.</p>}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-700 border-b pb-2">AI-Generated Hymns</h2>
                <div className="space-y-3 mt-4">
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
            </div>
        </div>
    );
};

const AiToolsView: React.FC = () => {
    const [topic, setTopic] = useState('God\'s Grace');
    const [generatedHymn, setGeneratedHymn] = useState<GeneratedHymn | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState('');
    const { language } = useContext(LanguageContext);
    
    const handleGenerate = useCallback(async () => {
        setIsGenerating(true);
        setGenerationError('');
        setGeneratedHymn(null);
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

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700 border-b pb-2">AI Hymn Generation</h2>
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
            
            {generatedHymn && generatedHymn.lyrics && (
                <div>
                <label className="block text-sm font-medium text-gray-700">Generated Hymn:</label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <h4 className="font-bold">{generatedHymn.title}</h4>
                    <p className="whitespace-pre-wrap mt-2">{generatedHymn.lyrics}</p>
                </div>
                </div>
            )}
            {generationError && <p className="text-red-600 text-sm">{generationError}</p>}
        </div>
    )
}

const AddHymnView: React.FC = () => {
    const [hymnData, setHymnData] = useState({
        number: '',
        title: '',
        category: Category.Praise,
        lyrics: '',
        audioUrl: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setHymnData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("This is a demo. Form submission is not implemented in this version.");
    };

    return (
         <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Add / Edit Hymn</h2>
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
                <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">
                Save Hymn
                </button>
            </div>
        </form>
    );
};


const PortalPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('favorites');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'favorites':
                return <FavoritesView />;
            case 'ai-tools':
                return <AiToolsView />;
            case 'add-hymn':
                return <AddHymnView />
            default:
                return <FavoritesView />;
        }
    };

    const TabButton: React.FC<{tabId: string, children: React.ReactNode}> = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border ${activeTab === tabId ? 'bg-white border-gray-200 border-b-white -mb-px' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
        >
            {children}
        </button>
    );

    return (
        <div>
            <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to your Portal</h1>
                <p className="text-gray-600">Here you can manage your favorite hymns and use special tools.</p>
                <p className="text-sm text-gray-500 mt-1">Logged in as: {user?.email}</p>
            </div>
            
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <TabButton tabId="favorites">My Favorites</TabButton>
                    <TabButton tabId="ai-tools">AI Tools</TabButton>
                    <TabButton tabId="add-hymn">Add Hymn</TabButton>
                </nav>
            </div>

            <div className="bg-white p-8 rounded-b-lg rounded-r-lg shadow-lg border border-t-0 border-gray-200">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default PortalPage;
