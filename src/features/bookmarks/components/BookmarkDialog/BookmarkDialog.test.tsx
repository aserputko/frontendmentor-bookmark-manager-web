import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BookmarkDialog } from './BookmarkDialog';
import type { AddBookmarkForm } from '../../types';

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('BookmarkDialog', () => {
  const mockOnSubmit = jest.fn();
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with title and form fields', () => {
    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test Dialog' })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
  });

  it('renders informer text when provided', () => {
    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        informer='This is an informer message'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByText('This is an informer message')).toBeInTheDocument();
  });

  it('does not render informer text when not provided', () => {
    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.queryByText('This is an informer message')).not.toBeInTheDocument();
  });

  it('pre-populates form with defaultValues', () => {
    const defaultValues: Partial<AddBookmarkForm> = {
      title: 'Pre-filled Title',
      description: 'Pre-filled Description',
      websiteURL: 'https://example.com',
      tags: 'Tag1, Tag2',
    };

    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        defaultValues={defaultValues}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByDisplayValue('Pre-filled Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pre-filled Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tag1, Tag2')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValueOnce(undefined);

    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
      />,
    );

    await user.type(screen.getByLabelText(/title/i), 'Test Title');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.type(screen.getByLabelText(/website url/i), 'https://example.com');
    await user.type(screen.getByLabelText(/tags/i), 'Tag1, Tag2');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      const callArgs = mockOnSubmit.mock.calls[0][0];
      expect(callArgs).toEqual({
        title: 'Test Title',
        description: 'Test Description',
        websiteURL: 'https://example.com',
        tags: 'Tag1, Tag2',
      });
    });
  });

  it('closes dialog when Cancel button is clicked', async () => {
    const user = userEvent.setup();

    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables submit button when isSubmitting is true', () => {
    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
        isSubmitting={true}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();

    renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        onSubmit={mockOnSubmit}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/website url is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('resets form when dialog opens with new defaultValues', async () => {
    const defaultValues1: Partial<AddBookmarkForm> = {
      title: 'First Title',
      description: 'First Description',
      websiteURL: 'https://first.com',
      tags: 'Tag1',
    };

    const { rerender } = renderWithClient(
      <BookmarkDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title='Test Dialog'
        submitButtonText='Submit'
        defaultValues={defaultValues1}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(screen.getByDisplayValue('First Title')).toBeInTheDocument();

    const defaultValues2: Partial<AddBookmarkForm> = {
      title: 'Second Title',
      description: 'Second Description',
      websiteURL: 'https://second.com',
      tags: 'Tag2',
    };

    rerender(
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: { retry: false, gcTime: 0 },
              mutations: { retry: false },
            },
          })
        }
      >
        <BookmarkDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          title='Test Dialog'
          submitButtonText='Submit'
          defaultValues={defaultValues2}
          onSubmit={mockOnSubmit}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Second Title')).toBeInTheDocument();
    });
  });
});

