import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import type { Bookmark } from '../../types';
import { getHostnameFromURL } from '../../utils';
import { BookmarkCard } from './BookmarkCard';

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

const baseBookmark: Bookmark = {
  id: '1',
  title: 'My Bookmark',
  description: 'A useful link',
  websiteURL: 'https://example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  tags: [],
  visitedCount: 0,
};

describe('BookmarkCard', () => {
  it('renders title and link with correct attributes', () => {
    renderWithClient(<BookmarkCard bookmark={baseBookmark} />);

    expect(screen.getByRole('heading', { level: 2, name: /my bookmark/i })).toBeInTheDocument();

    const link = screen.getByRole('link', { name: getHostnameFromURL(baseBookmark.websiteURL) });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', baseBookmark.websiteURL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders description when provided', () => {
    renderWithClient(<BookmarkCard bookmark={baseBookmark} />);
    expect(screen.getByText(/a useful link/i)).toBeInTheDocument();
  });

  it('does not render description when null', () => {
    const noDesc = { ...baseBookmark, description: null };
    renderWithClient(<BookmarkCard bookmark={noDesc} />);
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

    renderWithClient(<BookmarkCard bookmark={withTags} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('merges custom className onto the wrapper', () => {
    renderWithClient(<BookmarkCard bookmark={baseBookmark} className='border' />);
    const heading = screen.getByRole('heading', { level: 2, name: /my bookmark/i });
    // Traverse up to find the card wrapper (h2 -> div -> div -> card wrapper)
    const wrapper = heading.parentElement?.parentElement?.parentElement as HTMLElement;
    expect(wrapper).toHaveClass('border');
  });
});
