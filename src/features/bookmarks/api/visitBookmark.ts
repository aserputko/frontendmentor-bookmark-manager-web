export async function visitBookmark(id: string): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/bookmarks/${id}/visit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to visit bookmark');
  }
}
