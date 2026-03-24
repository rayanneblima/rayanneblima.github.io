"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "dev-tools-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(new Set(JSON.parse(stored) as string[]));
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const isFav = useCallback((id: string) => favorites.has(id), [favorites]);

  return { favorites, toggle, isFav, loaded, count: favorites.size };
}
