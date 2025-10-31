import { useQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 36; // 12;

export const ALL_BOOKMARKS_QUERY_KEY = (page?: number, limit?: number) =>
  ['bookmarks', `page=${page}`, `limit=${limit}`] as const;

export function useAllBookmarks(page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) {
  return useQuery({
    queryKey: ALL_BOOKMARKS_QUERY_KEY(page, limit),
    queryFn: () => fetchBookmarks(page, limit),
  });
}
