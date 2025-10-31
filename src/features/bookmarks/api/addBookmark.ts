import type { AddBookmarkRequest } from '../types';

export async function addBookmark(payload: AddBookmarkRequest): Promise<void> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to add bookmark');
  }
}

