// Mock fetch before importing the module
global.fetch = jest.fn();

import { addBookmark } from './addBookmark';
import type { AddBookmarkRequest } from '../types';

describe('addBookmark', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends POST request with correct payload and headers', async () => {
    const payload: AddBookmarkRequest = {
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: ['JavaScript', 'TypeScript'],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 201,
    });

    await addBookmark(payload);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[0]).toContain('/bookmarks');
    expect(callArgs[1]).toEqual({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  });

  it('throws error when response is not ok', async () => {
    const payload: AddBookmarkRequest = {
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(addBookmark(payload)).rejects.toThrow('Failed to add bookmark');
  });

  it('handles network errors', async () => {
    const payload: AddBookmarkRequest = {
      title: 'Test Bookmark',
      description: 'Test Description',
      websiteURL: 'https://example.com',
      tags: [],
    };

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(addBookmark(payload)).rejects.toThrow('Network error');
  });
});

