import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import HymnListPage from './pages/HymnListPage';
import HymnDetailPage from './pages/HymnDetailPage';
import AdminPage from './pages/AdminPage';
import InspirationPage from './pages/InspirationPage';
import FavoritesPage from './pages/FavoritesPage';
import { LanguageProvider } from './context/LanguageContext';
import { LikesProvider } from './context/LikesContext';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <LanguageProvider>
      <LikesProvider>
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hymns" element={<HymnListPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
              <Route path="/hymns/:id" element={<HymnDetailPage />} />
              <Route path="/inspiration" element={<InspirationPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} Digital Hymnal. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </LikesProvider>
    </LanguageProvider>
  );
};

export default App;
