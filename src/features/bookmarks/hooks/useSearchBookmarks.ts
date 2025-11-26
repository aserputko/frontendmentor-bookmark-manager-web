import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks/use-debounce';

/**
 * Hook to manage bookmark search state synchronized with URL query parameter "s".
 * Debounces input changes by 350ms before updating the URL.
 *
 * @returns An object containing:
 *   - searchValue: The current search input value
 *   - setSearchValue: Function to update the search input value
 *   - debouncedSearchValue: The debounced search value (synced to URL)
 */
export function useSearchBookmarks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchValue = searchParams.get('s') || '';
  const [searchValue, setSearchValue] = useState(urlSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 350);

  // Update URL when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue !== urlSearchValue) {
      if (debouncedSearchValue) {
        setSearchParams({ s: debouncedSearchValue }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  }, [debouncedSearchValue, urlSearchValue, setSearchParams]);

  return {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
  };
}
