import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmark } from '../api';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) => {
      return deleteBookmark(bookmarkId);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKeys.all() });
    },
  });
}

