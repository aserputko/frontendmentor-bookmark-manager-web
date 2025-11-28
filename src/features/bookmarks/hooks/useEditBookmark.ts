import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editBookmark } from '../api';
import type { AddBookmarkForm, AddBookmarkRequest } from '../types';
import { bookmarkQueryKeys } from './bookmarkQueryKeys';

export function useEditBookmark(bookmarkId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: AddBookmarkForm) => {
      // Convert comma-separated tags string to array
      const tagsArray = formData.tags
        ? formData.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

      const payload: AddBookmarkRequest = {
        title: formData.title,
        description: formData.description,
        websiteURL: formData.websiteURL,
        tags: tagsArray,
      };

      return editBookmark(bookmarkId, payload);
    },
    onSuccess: () => {
      // Invalidate all infinite bookmark queries (matches all limit variants)
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKeys.all() });
    },
  });
}
