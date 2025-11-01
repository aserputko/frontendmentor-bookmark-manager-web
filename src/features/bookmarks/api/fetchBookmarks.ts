import type { BookmarksResponse } from '../types';
import { BookmarksResponseSchema } from '../types';

export async function fetchBookmarks(page?: number, limit?: number): Promise<BookmarksResponse> {
  const params = new URLSearchParams();
  if (page !== undefined) {
    params.append('page', String(page));
  }
  if (limit !== undefined) {
    params.append('limit', String(limit));
  }

  const queryString = params.toString();
  const url = `${process.env.API_BASE_URL}/bookmarks${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch bookmarks');
  }

  const data = await response.json();
  return BookmarksResponseSchema.parse(data);
}
