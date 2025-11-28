export async function unpinBookmark(id: string): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/bookmarks/${id}/unpin`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to unpin bookmark');
  }
}
