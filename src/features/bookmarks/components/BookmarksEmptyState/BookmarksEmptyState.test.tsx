import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import { BookmarksEmptyState } from './BookmarksEmptyState';

// Mock the hooks module
jest.mock('../../hooks', () => ({
  useAddBookmark: jest.fn(() => ({
    mutateAsync: jest.fn(),
  })),
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
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

describe('BookmarksEmptyState', () => {
  it('renders empty message and CTA', () => {
    renderWithClient(<BookmarksEmptyState />);
    expect(screen.getByText(/no bookmarks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/you haven't added any bookmarks yet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();
  });
});
