import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { EditBookmarkDialog } from './EditBookmarkDialog';
import type { Bookmark } from '../../types';

jest.mock('../../hooks', () => ({
  useEditBookmark: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

import { toast } from 'sonner';
import { useEditBookmark } from '../../hooks';

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('EditBookmarkDialog', () => {
  const mockBookmark: Bookmark = {
    id: 'bookmark-123',
    title: 'My Bookmark',
    description: 'A useful link',
    websiteURL: 'https://example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [
      { id: 'tag-1', title: 'React', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      { id: 'tag-2', title: 'TypeScript', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    ],
    visitedCount: 0,
  };

  const mockMutateAsync = jest.fn();
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useEditBookmark as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
  });

  it('renders dialog with edit title and informer', () => {
    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Edit bookmark' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Update your saved link details — change the title, description, URL, or tags anytime.',
      ),
    ).toBeInTheDocument();
  });

  it('pre-populates form with bookmark data', () => {
    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    expect(screen.getByDisplayValue('My Bookmark')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A useful link')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('React, TypeScript')).toBeInTheDocument();
  });

  it('handles null description', () => {
    const bookmarkWithNullDesc = { ...mockBookmark, description: null };

    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={bookmarkWithNullDesc}
      />,
    );

    const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
    expect(descriptionInput.value).toBe('');
  });

  it('shows Save Bookmark button', () => {
    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    expect(screen.getByRole('button', { name: /save bookmark/i })).toBeInTheDocument();
  });

  it('submits form with updated data and shows success toast', async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockResolvedValueOnce(undefined);

    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Title');

    const submitButton = screen.getByRole('button', { name: /save bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });

    expect(toast.success).toHaveBeenCalledWith('The bookmark is updated');
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows error toast on submission failure', async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockRejectedValueOnce(new Error('API Error'));

    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /save bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('The bookmark is not updated, Please try again');
    });

    // onOpenChange is called before the mutation, so it will be called even on error
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables submit button when isPending is true', () => {
    (useEditBookmark as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    });

    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /save bookmark/i });
    expect(submitButton).toBeDisabled();
  });

  it('converts tags array to comma-separated string', () => {
    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={mockBookmark}
      />,
    );

    const tagsInput = screen.getByLabelText(/tags/i) as HTMLInputElement;
    expect(tagsInput.value).toBe('React, TypeScript');
  });

  it('handles empty tags array', () => {
    const bookmarkWithNoTags = { ...mockBookmark, tags: [] };

    renderWithClient(
      <EditBookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        bookmark={bookmarkWithNoTags}
      />,
    );

    const tagsInput = screen.getByLabelText(/tags/i) as HTMLInputElement;
    expect(tagsInput.value).toBe('');
  });
});

