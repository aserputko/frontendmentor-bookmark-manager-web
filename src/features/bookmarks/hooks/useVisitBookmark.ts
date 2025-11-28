import { useMutation, useQueryClient } from '@tanstack/react-query';
import { visitBookmark } from '../api';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

type VisitBookmarkParams = {
  id: string;
  websiteURL: string;
};

export function useVisitBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, websiteURL }: VisitBookmarkParams) => {
      // Open the URL in a new tab
      window.open(websiteURL, '_blank', 'noopener,noreferrer');

      return visitBookmark(id);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKeys.all() });
    },
  });
}
