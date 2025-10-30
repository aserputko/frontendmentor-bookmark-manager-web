import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BookmarksPage } from './BookmarksPage';

function renderWithRouter(ui: React.ReactElement, initialEntries: string[] = ['/']) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);
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
