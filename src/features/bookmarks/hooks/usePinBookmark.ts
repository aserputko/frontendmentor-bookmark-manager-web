import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pinBookmark } from '../api';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function usePinBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) => {
      return pinBookmark(bookmarkId);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKeys.all() });
    },
  });
}

