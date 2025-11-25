import type { CalculationResult } from "@shared/schema";

export interface Favorite {
  id: string;
  inputNumber: number;
  result: CalculationResult;
  addedAt: number;
}

const FAVORITES_KEY = "cycle-detector-favorites";
const MAX_FAVORITES = 20;

export function getFavorites(): Favorite[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
}

export function addFavorite(inputNumber: number, result: CalculationResult): void {
  try {
    const favorites = getFavorites();
    const exists = favorites.some(f => f.inputNumber === inputNumber);
    if (exists) return;
    
    const newFavorite: Favorite = {
      id: `fav-${inputNumber}-${Date.now()}`,
      inputNumber,
      result,
      addedAt: Date.now(),
    };
    
    const updated = [newFavorite, ...favorites].slice(0, MAX_FAVORITES);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
}

export function removeFavorite(inputNumber: number): void {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(f => f.inputNumber !== inputNumber);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

export function isFavorite(inputNumber: number): boolean {
  return getFavorites().some(f => f.inputNumber === inputNumber);
}
