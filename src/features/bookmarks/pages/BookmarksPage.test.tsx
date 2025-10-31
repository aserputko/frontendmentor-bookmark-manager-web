import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BookmarksPage } from './BookmarksPage';

jest.mock('../api', () => ({
  addBookmark: jest.fn(),
  fetchBookmarks: jest.fn(),
}));

function renderWithRouter(ui: React.ReactElement, initialEntries: string[] = ['/']) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('BookmarksPage', () => {
  it('renders the navbar and layout content', () => {
    renderWithRouter(
      <Routes>
        <Route path='/' element={<BookmarksPage />}>
          <Route index element={<div>Child Route</div>} />
        </Route>
      </Routes>,
    );

    // Navbar elements
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();

    // Layout renders the outlet content
    expect(screen.getByText('Child Route')).toBeInTheDocument();

    // Sidebar heading from Layout/AppSidebar
    expect(screen.getByText(/bookmark manager/i)).toBeInTheDocument();
  });
});
