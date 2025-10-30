import { render, screen } from '@testing-library/react';
import { AllBookmarksEmpty } from './AllBookmarksEmpty';

describe('AllBookmarksEmpty', () => {
  it('renders empty message and CTA', () => {
    render(<AllBookmarksEmpty />);
    expect(screen.getByText(/no bookmarks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/you haven't added any bookmarks yet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();
  });
});
