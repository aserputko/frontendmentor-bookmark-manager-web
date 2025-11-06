import type { AddBookmarkRequest } from '../types';

export async function editBookmark(id: string, payload: AddBookmarkRequest): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/bookmarks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to edit bookmark');
  }
}
