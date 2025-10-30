import { render, screen } from '@testing-library/react';
import { AllBookmarksError } from './AllBookmarksError';

describe('AllBookmarksError', () => {
  it('renders error message', () => {
    render(<AllBookmarksError />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please try to reload this page/i)).toBeInTheDocument();
  });
});
