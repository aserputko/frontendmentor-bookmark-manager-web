import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { useEditBookmark } from './useEditBookmark';

jest.mock('../api', () => ({
  editBookmark: jest.fn(),
}));

import { editBookmark } from '../api';

function renderWithClient(bookmarkId: string) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return {
    ...renderHook(() => useEditBookmark(bookmarkId), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    }),
    client,
  };
}

describe('useEditBookmark', () => {
  const bookmarkId = 'bookmark-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('converts comma-separated tags string to array', async () => {
    const { result } = renderWithClient(bookmarkId);

    (editBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: 'JavaScript, TypeScript, React',
    });

    expect(editBookmark).toHaveBeenCalledWith(bookmarkId, {
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: ['JavaScript', 'TypeScript', 'React'],
    });
  });

  it('handles empty tags string', async () => {
    const { result } = renderWithClient(bookmarkId);

    (editBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: '',
    });

    expect(editBookmark).toHaveBeenCalledWith(bookmarkId, {
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: [],
    });
  });

  it('handles undefined tags', async () => {
    const { result } = renderWithClient(bookmarkId);

    (editBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
    });

    expect(editBookmark).toHaveBeenCalledWith(bookmarkId, {
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: [],
    });
  });

  it('trims and filters empty tags', async () => {
    const { result } = renderWithClient(bookmarkId);

    (editBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: '  JavaScript  ,  TypeScript  ,  ,  React  ',
    });

    expect(editBookmark).toHaveBeenCalledWith(bookmarkId, {
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: ['JavaScript', 'TypeScript', 'React'],
    });
  });

  it('invalidates bookmarks query on success', async () => {
    const client = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: Infinity },
        mutations: { retry: false },
      },
    });

    const { result } = renderHook(() => useEditBookmark(bookmarkId), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    // Set up an infinite query first so we can check its state
    await client.prefetchInfiniteQuery({
      queryKey: ['bookmarks', 'infinite', 'limit=12'],
      queryFn: async () => ({
        data: [],
        meta: { total: 0, page: 1, limit: 12, totalPages: 0 },
      }),
      initialPageParam: 1,
      getNextPageParam: () => undefined,
    });

    (editBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Updated Bookmark',
      description: 'Updated Description',
      websiteURL: 'https://example.com',
      tags: 'JavaScript',
    });

    // Wait for invalidation to complete
    await waitFor(() => {
      const queryState = client.getQueryState(['bookmarks', 'infinite', 'limit=12']);
      expect(queryState?.isInvalidated).toBe(true);
    });
  });

  it('handles errors from editBookmark', async () => {
    const { result } = renderWithClient(bookmarkId);

    const error = new Error('Failed to edit bookmark');
    (editBookmark as jest.Mock).mockRejectedValueOnce(error);

    await expect(
      result.current.mutateAsync({
        title: 'Updated Bookmark',
        description: 'Updated Description',
        websiteURL: 'https://example.com',
        tags: 'JavaScript',
      }),
    ).rejects.toThrow('Failed to edit bookmark');
  });
});

