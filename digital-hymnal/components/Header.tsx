import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MusicNoteIcon, BookOpenIcon, SparklesIcon, CogIcon, ChevronDownIcon, HeartIcon } from './icons/Icons';
import { LanguageContext } from '../context/LanguageContext';
import { Language, LanguageLabels } from '../types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const navLinkClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-brand-blue-100 hover:text-brand-blue-800 transition-colors";
  const activeNavLinkClasses = "bg-brand-blue-100 text-brand-blue-800";
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if(newSearchTerm) {
      navigate(`/hymns?search=${encodeURIComponent(newSearchTerm)}`);
    } else {
      navigate('/hymns');
    }
  }

  const LanguageSelector = () => (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none bg-gray-100 border-gray-300 rounded-full py-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
        aria-label="Select Language"
      >
        {Object.entries(LanguageLabels).map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
       <ChevronDownIcon className="h-5 w-5 text-gray-500 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <MusicNoteIcon className="h-8 w-8 text-brand-blue-700" />
            <span className="font-serif text-2xl font-bold text-gray-800">Digital Hymnal</span>
          </Link>
          <div className="flex-grow flex items-center justify-end gap-4">
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="/hymns" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <BookOpenIcon className="h-5 w-5" />
                <span>Hymns</span>
              </NavLink>
              <NavLink to="/favorites" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <HeartIcon className="h-5 w-5" />
                <span>Favorites</span>
              </NavLink>
              <NavLink to="/inspiration" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <SparklesIcon className="h-5 w-5" />
                <span>Inspiration</span>
              </NavLink>
              <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <CogIcon className="h-5 w-5" />
                <span>Admin</span>
              </NavLink>
            </nav>
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="w-full max-w-xs">
              <input
                type="search"
                placeholder="Search hymns..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-shadow text-sm"
              />
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-gray-200">
           <NavLink to="/hymns" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
              <BookOpenIcon className="h-5 w-5" />
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <HeartIcon className="h-5 w-5" />
            </NavLink>
            <NavLink to="/inspiration" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
              <SparklesIcon className="h-5 w-5" />
            </NavLink>
            <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;