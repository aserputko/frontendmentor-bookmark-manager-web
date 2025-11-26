import { useEffect, useState } from 'react';

/**
 * Debounces a value by delaying updates until after a specified delay period.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 350)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 350);
 *
 * useEffect(() => {
 *   // This will only run after user stops typing for 350ms
 *   performSearch(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebounce<T>(value: T, delay = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

