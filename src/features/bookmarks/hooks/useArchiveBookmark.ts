import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveBookmark } from '../api';

export function useArchiveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) => {
      return archiveBookmark(bookmarkId);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: ['bookmarks', 'infinite'] });
    },
  });
}
