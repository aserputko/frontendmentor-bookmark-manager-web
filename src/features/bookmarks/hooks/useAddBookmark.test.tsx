import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useAddBookmark } from './useAddBookmark';
import { ALL_BOOKMARKS_QUERY_KEY } from './useAllBookmarks';

jest.mock('../api', () => ({
  addBookmark: jest.fn(),
}));

import { addBookmark } from '../api';

function renderWithClient() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return {
    ...renderHook(() => useAddBookmark(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    }),
    client,
  };
}

describe('useAddBookmark', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('converts comma-separated tags string to array', async () => {
    const { result } = renderWithClient();

    (addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: 'JavaScript, TypeScript, React',
    });

    expect(addBookmark).toHaveBeenCalledWith({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: ['JavaScript', 'TypeScript', 'React'],
    });
  });

  it('handles empty tags string', async () => {
    const { result } = renderWithClient();

    (addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: '',
    });

    expect(addBookmark).toHaveBeenCalledWith({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: [],
    });
  });

  it('handles undefined tags', async () => {
    const { result } = renderWithClient();

    (addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
    });

    expect(addBookmark).toHaveBeenCalledWith({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: [],
    });
  });

  it('trims and filters empty tags', async () => {
    const { result } = renderWithClient();

    (addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: '  JavaScript  ,  TypeScript  ,  ,  React  ',
    });

    expect(addBookmark).toHaveBeenCalledWith({
      title: 'Test Bookmark',
      description: 'Test Description',
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

    const { result } = renderHook(() => useAddBookmark(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    // Set up a query first so we can check its state
    await client.prefetchQuery({
      queryKey: ALL_BOOKMARKS_QUERY_KEY,
      queryFn: async () => [],
    });

    (addBookmark as jest.Mock).mockResolvedValueOnce(undefined);

    await result.current.mutateAsync({
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: 'JavaScript',
    });

    // Wait for invalidation to complete
    await waitFor(() => {
      const queryState = client.getQueryState(ALL_BOOKMARKS_QUERY_KEY);
      expect(queryState?.isInvalidated).toBe(true);
    });
  });

  it('handles errors from addBookmark', async () => {
    const { result } = renderWithClient();

    const error = new Error('Failed to add bookmark');
    (addBookmark as jest.Mock).mockRejectedValueOnce(error);

    await expect(
      result.current.mutateAsync({
        title: 'Test Bookmark',
        description: 'Test Description',
        websiteURL: 'https://example.com',
        tags: 'JavaScript',
      }),
    ).rejects.toThrow('Failed to add bookmark');
  });
});
