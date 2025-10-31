import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark } from '../api';
import type { AddBookmarkForm, AddBookmarkRequest } from '../types';
import { ALL_BOOKMARKS_QUERY_KEY } from './useAllBookmarks';

export function useAddBookmark() {
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

      return addBookmark(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_BOOKMARKS_QUERY_KEY });
    },
  });
}
