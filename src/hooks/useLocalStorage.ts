import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state synchronized with localStorage
 * @param key - The localStorage key
 * @param initialValue - Default value if nothing exists in localStorage
 * @returns [storedValue, setValue] tuple similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}