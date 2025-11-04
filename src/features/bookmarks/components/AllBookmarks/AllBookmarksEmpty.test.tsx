import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import { AllBookmarksEmpty } from './AllBookmarksEmpty';

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

describe('AllBookmarksEmpty', () => {
  it('renders empty message and CTA', () => {
    renderWithClient(<AllBookmarksEmpty />);
    expect(screen.getByText(/no bookmarks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/you haven't added any bookmarks yet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();
  });
});
