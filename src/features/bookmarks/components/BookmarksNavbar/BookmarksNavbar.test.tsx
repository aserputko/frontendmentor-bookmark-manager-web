import { render, screen } from '@testing-library/react';
import { BookmarksNavbar } from './BookmarksNavbar';

describe('BookmarksNavbar', () => {
  it('renders a navigation bar', () => {
    render(<BookmarksNavbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows search input with placeholder', () => {
    render(<BookmarksNavbar />);
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
  });

  it('shows Add Bookmark button', () => {
    render(<BookmarksNavbar />);
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();
  });

  it('renders user avatar (fallback initials visible)', () => {
    render(<BookmarksNavbar />);
    expect(screen.getByText('AS')).toBeInTheDocument();
  });
});
