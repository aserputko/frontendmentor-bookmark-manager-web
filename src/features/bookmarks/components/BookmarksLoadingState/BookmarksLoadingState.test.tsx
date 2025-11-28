import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { BookmarksLoadingState } from './BookmarksLoadingState';

describe('BookmarksLoadingState', () => {
  it('renders loading indicator', () => {
    render(<BookmarksLoadingState />);
    expect(screen.getByText(/loading bookmarks/i)).toBeInTheDocument();
  });
});
