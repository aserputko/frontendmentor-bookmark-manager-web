// Mock fetch before importing the module
global.fetch = jest.fn();

import { fetchBookmarks } from './fetchBookmarks';
import type { BookmarksResponse } from '../types';

describe('fetchBookmarks', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches bookmarks and returns validated response', async () => {
    const mockResponse: BookmarksResponse = {
      data: [
        {
          id: '1',
          title: 'Test Bookmark',
          description: 'Test Description',
          websiteURL: 'https://example.com',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          tags: [
            {
              id: 't1',
              title: 'JavaScript',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z',
            },
          ],
        },
      ],
      meta: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await fetchBookmarks();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[0]).toContain('/bookmarks');
    expect(result).toEqual(mockResponse);
  });

  it('throws error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchBookmarks()).rejects.toThrow('Failed to fetch bookmarks');
  });

  it('validates response schema and throws on invalid data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        data: [
          {
            id: '1',
            title: 'Test',
            // Missing required fields
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      }),
    });

    await expect(fetchBookmarks()).rejects.toThrow();
  });

  it('handles network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchBookmarks()).rejects.toThrow('Network error');
  });
});

