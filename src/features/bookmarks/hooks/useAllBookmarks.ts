import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';
import type { BookmarksResponse } from '../types';

export const BOOKMARKS_DEFAULT_LIMIT = 12;

export const ALL_BOOKMARKS_QUERY_KEY = (search: string) =>
  ['bookmarks', 'infinite', search] as const;

export function useAllBookmarks(limit = BOOKMARKS_DEFAULT_LIMIT, searchValue = '') {
  return useInfiniteQuery<BookmarksResponse>({
    queryKey: ALL_BOOKMARKS_QUERY_KEY(searchValue),
    queryFn: ({ pageParam }) => fetchBookmarks(pageParam as number, limit, searchValue),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
