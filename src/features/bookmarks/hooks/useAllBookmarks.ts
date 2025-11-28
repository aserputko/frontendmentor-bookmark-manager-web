import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';
import { DEFAULT_PAGE_SIZE, type BookmarksResponse } from '../types';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function useAllBookmarks(limit = DEFAULT_PAGE_SIZE, sortBy = 'recently-added', search = '') {
  return useInfiniteQuery<BookmarksResponse>({
    queryKey: bookmarkQueryKeys.active(search, sortBy),
    queryFn: ({ pageParam }) => fetchBookmarks(pageParam as number, limit, sortBy, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
