import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { triggerLightImpact } from "../device/haptics";
import { Exercise } from "#exercises";

const FAVORITES_KEY = "@workout_app_favorites";

interface FavoritesContextType {
  favorites: Exercise[];
  toggleFavorite: (exercise: Exercise) => Promise<void>;
  isFavorite: (name: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Exercise[]>([]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to load favorites", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadFavorites();
  }, []);

  const toggleFavorite = async (exercise: Exercise) => {
    void triggerLightImpact();
    let updated: Exercise[];

    if (favorites.some((fav) => fav.name === exercise.name)) {
      updated = favorites.filter((fav) => fav.name !== exercise.name);
    } else {
      updated = [...favorites, exercise];
    }

    setFavorites(updated);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to preserve favorite state", err);
    }
  };

  const isFavorite = (name: string) =>
    favorites.some((fav) => fav.name === name);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}
