import { z } from 'zod';
import { BookmarkSchema } from './bookmark.types';

export const DEFAULT_PAGE_SIZE = 12;

// Pagination metadata schema
export const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

// Bookmarks list response schema
export const BookmarksResponseSchema = z.object({
  data: z.array(BookmarkSchema),
  meta: PaginationMetaSchema,
});

export type BookmarksResponse = z.infer<typeof BookmarksResponseSchema>;
