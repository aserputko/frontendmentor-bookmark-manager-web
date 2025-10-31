import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BookmarksNavbar } from './BookmarksNavbar';

jest.mock('../../api', () => ({
  addBookmark: jest.fn(),
  fetchBookmarks: jest.fn(),
}));

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('BookmarksNavbar', () => {
  it('renders a navigation bar', () => {
    renderWithClient(<BookmarksNavbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows search input with placeholder', () => {
    renderWithClient(<BookmarksNavbar />);
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
  });

  it('shows Add Bookmark button', () => {
    renderWithClient(<BookmarksNavbar />);
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();
  });

  it('renders user avatar (fallback initials visible)', () => {
    renderWithClient(<BookmarksNavbar />);
    expect(screen.getByText('AS')).toBeInTheDocument();
  });
});
