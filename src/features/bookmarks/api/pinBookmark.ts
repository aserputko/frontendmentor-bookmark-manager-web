export async function pinBookmark(id: string): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/bookmarks/${id}/pin`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to pin bookmark');
  }
}
