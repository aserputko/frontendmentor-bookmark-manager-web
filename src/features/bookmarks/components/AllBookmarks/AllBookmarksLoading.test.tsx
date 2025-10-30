import { render, screen } from '@testing-library/react';
import { AllBookmarksLoading } from './AllBookmarksLoading';

describe('AllBookmarksLoading', () => {
  it('renders loading indicator', () => {
    render(<AllBookmarksLoading />);
    expect(screen.getByText(/loading bookmarks/i)).toBeInTheDocument();
  });
});
