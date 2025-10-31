import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AddBookmarkDialog } from './AddBookmarkDialog';

// Mock the hook
jest.mock('../../hooks', () => ({
  useAddBookmark: jest.fn(),
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

import { toast } from 'sonner';
import { useAddBookmark } from '../../hooks';

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('AddBookmarkDialog', () => {
  const mockMutateAsync = jest.fn();
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAddBookmark as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
  });

  it('renders dialog when open is true', () => {
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Add Bookmark' })).toBeInTheDocument();
  });

  it('does not render dialog when open is false', () => {
    renderWithClient(<AddBookmarkDialog open={false} onOpenChange={mockOnOpenChange} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
  });

  it('shows Cancel and Add Bookmark buttons', () => {
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add bookmark/i })).toBeInTheDocument();
  });

  it('closes dialog when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes dialog when close button (X) is clicked', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('submits form with valid data and shows success toast', async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockResolvedValueOnce(undefined);

    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    await user.type(screen.getByLabelText(/title/i), 'Test Bookmark');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.type(screen.getByLabelText(/website url/i), 'https://example.com');
    await user.type(screen.getByLabelText(/tags/i), 'JavaScript, TypeScript');

    const submitButton = screen.getByRole('button', { name: /add bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        title: 'Test Bookmark',
        description: 'Test Description',
        websiteURL: 'https://example.com',
        tags: 'JavaScript, TypeScript',
      });
    });

    expect(toast.success).toHaveBeenCalledWith('The bookmark is saved');
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows error toast on submission failure', async () => {
    const user = userEvent.setup();
    mockMutateAsync.mockRejectedValueOnce(new Error('API Error'));

    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    await user.type(screen.getByLabelText(/title/i), 'Test Bookmark');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.type(screen.getByLabelText(/website url/i), 'https://example.com');

    const submitButton = screen.getByRole('button', { name: /add bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('The bookmark is not saved, Please try again');
    });

    expect(mockOnOpenChange).not.toHaveBeenCalled();
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    mockMutateAsync.mockReturnValueOnce(promise);

    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    await user.type(screen.getByLabelText(/title/i), 'Test Bookmark');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.type(screen.getByLabelText(/website url/i), 'https://example.com');

    const submitButton = screen.getByRole('button', { name: /add bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    resolvePromise!();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    const submitButton = screen.getByRole('button', { name: /add bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/website url is required/i)).toBeInTheDocument();
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('validates URL format', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    await user.type(screen.getByLabelText(/title/i), 'Test Bookmark');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    const urlInput = screen.getByLabelText(/website url/i);
    await user.clear(urlInput);
    await user.type(urlInput, 'not-a-valid-url');

    const submitButton = screen.getByRole('button', { name: /add bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/must be a valid url/i, { exact: false })).toBeInTheDocument();
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('validates max length constraints', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddBookmarkDialog open={true} onOpenChange={mockOnOpenChange} />);

    const longTitle = 'a'.repeat(281);
    const longDescription = 'b'.repeat(281);
    const longURL = 'https://example.com/' + 'c'.repeat(1024);

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, longTitle);

    const descInput = screen.getByLabelText(/description/i);
    await user.clear(descInput);
    await user.type(descInput, longDescription);

    const urlInput = screen.getByLabelText(/website url/i);
    await user.clear(urlInput);
    await user.type(urlInput, longURL);

    const submitButton = screen.getByRole('button', { name: /add bookmark/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/title must be at most 280 characters/i, { exact: false }),
      ).toBeInTheDocument();
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });
});
