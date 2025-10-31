import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';
import type { BookmarksResponse } from '../types';

export const BOOKMARKS_DEFAULT_LIMIT = 12;

export const ALL_BOOKMARKS_QUERY_KEY = ['bookmarks', 'infinite'] as const;

export function useAllBookmarks(limit = BOOKMARKS_DEFAULT_LIMIT) {
  return useInfiniteQuery<BookmarksResponse>({
    queryKey: ALL_BOOKMARKS_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchBookmarks(pageParam as number, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
