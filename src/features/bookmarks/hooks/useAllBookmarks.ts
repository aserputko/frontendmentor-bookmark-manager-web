import { useQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';

export const ALL_BOOKMARKS_QUERY_KEY = ['bookmarks'] as const;

export function useAllBookmarks() {
  return useQuery({
    queryKey: ALL_BOOKMARKS_QUERY_KEY,
    queryFn: fetchBookmarks,
  });
}
