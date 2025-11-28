import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unpinBookmark } from '../api';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function useUnpinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) => {
      return unpinBookmark(bookmarkId);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKeys.all() });
    },
  });
}

