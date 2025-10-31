import { render, screen } from '@testing-library/react';
import { AllBookmarks } from './AllBookmarks';

// Mock the hooks module to control states
jest.mock('../../hooks', () => ({
  useAllBookmarks: jest.fn(),
}));

// Mock BookmarkCard to a simple component to assert rendered items
jest.mock('../BookmarkCard', () => ({
  BookmarkCard: ({ bookmark }: { bookmark: { id: string; title: string } }) => (
    <div data-testid={`bookmark-${bookmark.id}`}>{bookmark.title}</div>
  ),
}));

import { useAllBookmarks } from '../../hooks';

describe('AllBookmarks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useAllBookmarks as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<AllBookmarks />);
    expect(screen.getByText(/loading bookmarks/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useAllBookmarks as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('boom'),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<AllBookmarks />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders empty state when no bookmarks', () => {
    (useAllBookmarks as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [], meta: { total: 0, page: 1, limit: 12, totalPages: 0 } }] },
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<AllBookmarks />);
    expect(screen.getByText(/no bookmarks yet/i)).toBeInTheDocument();
  });

  it('renders list of bookmarks when data available', () => {
    (useAllBookmarks as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            data: [
              { id: '1', title: 'Bookmark One' },
              { id: '2', title: 'Bookmark Two' },
            ],
            meta: { total: 2, page: 1, limit: 12, totalPages: 1 },
          },
        ],
      },
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<AllBookmarks />);
    expect(screen.getByTestId('bookmark-1')).toHaveTextContent('Bookmark One');
    expect(screen.getByTestId('bookmark-2')).toHaveTextContent('Bookmark Two');
  });
});
