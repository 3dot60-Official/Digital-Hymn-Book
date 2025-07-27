
import { useState, useEffect, useCallback } from 'react';
import { Hymn } from '../types';
import { hymnService } from '../services/hymnService';

export const useHymns = () => {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHymns = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await hymnService.getAllHymns();
      setHymns(data);
    } catch (e) {
      setError("Failed to load hymns. Please try refreshing the page.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHymns();
  }, [fetchHymns]);

  return { hymns, isLoading, error, refetch: fetchHymns };
};
