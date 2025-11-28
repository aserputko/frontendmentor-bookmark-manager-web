import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';
import type { BookmarksResponse } from '../types';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export const BOOKMARKS_DEFAULT_LIMIT = 12;

export function useAllBookmarks(limit = BOOKMARKS_DEFAULT_LIMIT, searchValue = '') {
  return useInfiniteQuery<BookmarksResponse>({
    queryKey: bookmarkQueryKeys.search(searchValue),
    queryFn: ({ pageParam }) => fetchBookmarks(pageParam as number, limit, searchValue),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
