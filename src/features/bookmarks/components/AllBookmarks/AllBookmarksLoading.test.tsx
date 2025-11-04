import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { AllBookmarksLoading } from './AllBookmarksLoading';

describe('AllBookmarksLoading', () => {
  it('renders loading indicator', () => {
    render(<AllBookmarksLoading />);
    expect(screen.getByText(/loading bookmarks/i)).toBeInTheDocument();
  });
});
