import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AllBookmarksPage } from './AllBookmarksPage';

jest.mock('../api', () => ({
  fetchBookmarks: jest.fn(),
}));

import { fetchBookmarks } from '../api';

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('AllBookmarksPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading', () => {
    (fetchBookmarks as jest.Mock).mockResolvedValueOnce({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
    renderWithClient(<AllBookmarksPage />);
    expect(screen.getByRole('heading', { name: /all bookmarks/i })).toBeInTheDocument();
  });

  it('shows loading then renders a list on success', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          title: 'Bookmark One',
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

    renderWithClient(<AllBookmarksPage />);

    // Loading state from AllBookmarksLoading
    expect(screen.getByText(/loading bookmarks/i)).toBeInTheDocument();

    // Then the bookmark card appears
    await waitFor(() => expect(screen.getByText('Bookmark One')).toBeInTheDocument());
  });

  it('shows empty state when no bookmarks', async () => {
    (fetchBookmarks as jest.Mock).mockResolvedValueOnce({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });

    renderWithClient(<AllBookmarksPage />);

    await waitFor(() => expect(screen.getByText(/no bookmarks yet/i)).toBeInTheDocument());
  });

  it('shows error state on failure', async () => {
    (fetchBookmarks as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch bookmarks'));

    renderWithClient(<AllBookmarksPage />);

    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });
});
