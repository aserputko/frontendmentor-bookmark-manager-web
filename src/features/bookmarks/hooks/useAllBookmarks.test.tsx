import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import React from 'react';
import { useAllBookmarks } from './useAllBookmarks';

// Note: React Query logs are not silenced in v5 here; tests should still pass.

jest.mock('../api', () => ({
  // Will override in tests
  fetchBookmarks: jest.fn(),
}));

import { fetchBookmarks } from '../api';

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });

  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

function TestComponent() {
  const { data, isLoading, isError, error } = useAllBookmarks();
  // Flatten pages for infinite query
  const bookmarks = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <div>
      {isLoading && <div data-testid='loading'>loading</div>}
      {isError && <div data-testid='error'>{(error as Error).message}</div>}
      {data && <div data-testid='count'>{bookmarks.length}</div>}
    </div>
  );
}

describe('useAllBookmarks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns data on success', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          title: 'Example',
          description: null,
          websiteURL: 'https://example.com',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          tags: [],
        },
      ],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    };

    (fetchBookmarks as jest.Mock).mockResolvedValueOnce(mockResponse);

    renderWithClient(<TestComponent />);

    // shows loading first
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // then renders data count
    await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'));

    expect(fetchBookmarks).toHaveBeenCalledTimes(1);
    expect(fetchBookmarks).toHaveBeenCalledWith(1, 12, ''); // initialPageParam, default limit, and empty searchValue
  });

  it('exposes error state on failure', async () => {
    (fetchBookmarks as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch bookmarks'));

    renderWithClient(<TestComponent />);

    // shows loading first
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // then shows error message
    await waitFor(() =>
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch bookmarks'),
    );
  });
});
