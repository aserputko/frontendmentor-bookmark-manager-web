import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unarchiveBookmark } from '../api';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function useUnarchiveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) => {
      return unarchiveBookmark(bookmarkId);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKeys.all() });
    },
  });
}
