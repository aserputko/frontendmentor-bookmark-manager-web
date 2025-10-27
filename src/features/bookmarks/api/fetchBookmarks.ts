import type { BookmarksResponse } from '../types';
import { BookmarksResponseSchema } from '../types';

export async function fetchBookmarks(): Promise<BookmarksResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookmarks`);

  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }

  const data = await response.json();
  return BookmarksResponseSchema.parse(data);
}
