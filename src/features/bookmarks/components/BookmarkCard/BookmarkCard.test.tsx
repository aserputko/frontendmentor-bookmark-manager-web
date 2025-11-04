import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import type { Bookmark } from '../../types';
import { BookmarkCard } from './BookmarkCard';

const baseBookmark: Bookmark = {
  id: '1',
  title: 'My Bookmark',
  description: 'A useful link',
  websiteURL: 'https://example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  tags: [],
};

describe('BookmarkCard', () => {
  it('renders title and link with correct attributes', () => {
    render(<BookmarkCard bookmark={baseBookmark} />);

    expect(screen.getByRole('heading', { level: 2, name: /my bookmark/i })).toBeInTheDocument();

    const link = screen.getByRole('link', { name: baseBookmark.websiteURL });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', baseBookmark.websiteURL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders description when provided', () => {
    render(<BookmarkCard bookmark={baseBookmark} />);
    expect(screen.getByText(/a useful link/i)).toBeInTheDocument();
  });

  it('does not render description when null', () => {
    const noDesc = { ...baseBookmark, description: null };
    render(<BookmarkCard bookmark={noDesc} />);
    expect(screen.queryByText(/a useful link/i)).not.toBeInTheDocument();
  });

  it('renders tags when present', () => {
    const withTags = {
      ...baseBookmark,
      tags: [
        { id: 't1', title: 'React', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
        { id: 't2', title: 'TypeScript', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      ],
    };

    render(<BookmarkCard bookmark={withTags} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('merges custom className onto the wrapper', () => {
    const { getByRole } = render(<BookmarkCard bookmark={baseBookmark} className='border' />);
    const heading = getByRole('heading', { level: 2, name: /my bookmark/i });
    const wrapper = heading.parentElement as HTMLElement; // h2 is a direct child of the wrapper div
    expect(wrapper).toHaveClass('border');
  });
});
