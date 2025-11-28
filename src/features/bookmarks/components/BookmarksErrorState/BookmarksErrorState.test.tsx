import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { BookmarksErrorState } from './BookmarksErrorState';

describe('BookmarksErrorState', () => {
  it('renders error message', () => {
    render(<BookmarksErrorState />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please try to reload this page/i)).toBeInTheDocument();
  });
});
