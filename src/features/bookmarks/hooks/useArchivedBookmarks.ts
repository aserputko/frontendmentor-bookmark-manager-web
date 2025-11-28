import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../api';
import { DEFAULT_PAGE_SIZE, type BookmarksResponse } from '../types';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function useArchivedBookmarks(
  limit = DEFAULT_PAGE_SIZE,
  sortBy = 'recently-added',
  search = '',
) {
  const archived = true;
  return useInfiniteQuery<BookmarksResponse>({
    queryKey: bookmarkQueryKeys.archived(sortBy, search),
    queryFn: ({ pageParam }) =>
      fetchBookmarks(pageParam as number, limit, sortBy, search, archived),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
