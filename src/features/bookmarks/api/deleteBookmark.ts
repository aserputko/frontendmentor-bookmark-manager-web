export async function deleteBookmark(id: string): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete bookmark');
  }
}
