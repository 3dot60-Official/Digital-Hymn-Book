import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import { Hymn, GeneratedHymn } from '../types';
import { useAuth } from './AuthContext';

type LikedItem = (Hymn | GeneratedHymn) & { likedAt: number };

interface LikesContextType {
  likedItems: LikedItem[];
  isLiked: (item: Hymn | GeneratedHymn) => boolean;
  toggleLike: (item: Hymn | GeneratedHymn) => void;
  getLikedHymns: (allHymns: Hymn[]) => Hymn[];
  getLikedGeneratedHymns: () => GeneratedHymn[];
}

export const LikesContext = createContext<LikesContextType>({
  likedItems: [],
  isLiked: () => false,
  toggleLike: () => {},
  getLikedHymns: () => [],
  getLikedGeneratedHymns: () => [],
});

export const useLikes = () => useContext(LikesContext);

const getItemId = (item: Hymn | GeneratedHymn): string => {
  if ('id' in item && typeof item.id === 'number') {
    return `hymn-${item.id}`;
  }
  return `generated-${item.title}`;
};

export const LikesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const { user } = useAuth();
  const storageKey = user ? `likedHymns-${user.id}` : 'likedHymns-guest';

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(storageKey);
      if (storedLikes) {
        setLikedItems(JSON.parse(storedLikes));
      } else {
        setLikedItems([]); 
      }
    } catch (error) {
      console.error("Could not parse liked hymns from localStorage", error);
      setLikedItems([]);
    }
  }, [storageKey]);

  const saveLikes = (items: LikedItem[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save liked hymns to localStorage", error);
    }
  };

  const isLiked = useCallback((item: Hymn | GeneratedHymn) => {
    if (!item) return false;
    const id = getItemId(item);
    return likedItems.some(liked => getItemId(liked) === id);
  }, [likedItems]);

  const toggleLike = useCallback((item: Hymn | GeneratedHymn) => {
    setLikedItems(prevItems => {
      const id = getItemId(item);
      const existingIndex = prevItems.findIndex(liked => getItemId(liked) === id);
      
      let newItems;
      if (existingIndex > -1) {
        newItems = prevItems.filter((_, index) => index !== existingIndex);
      } else {
        newItems = [...prevItems, { ...item, likedAt: Date.now() }];
      }
      saveLikes(newItems);
      return newItems;
    });
  }, [saveLikes]);

  const getLikedHymns = (allHymns: Hymn[]): Hymn[] => {
      const likedHymnIds = new Set(likedItems.filter(item => 'id' in item).map(item => (item as Hymn).id));
      return allHymns.filter(hymn => likedHymnIds.has(hymn.id));
  };
  
  const getLikedGeneratedHymns = (): GeneratedHymn[] => {
      return likedItems.filter(item => !('id' in item)).sort((a,b) => b.likedAt - a.likedAt) as GeneratedHymn[];
  };

  return (
    <LikesContext.Provider value={{ likedItems, isLiked, toggleLike, getLikedHymns, getLikedGeneratedHymns }}>
      {children}
    </LikesContext.Provider>
  );
};
