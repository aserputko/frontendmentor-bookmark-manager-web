import { z } from 'zod';

// Tag schema
export const TagSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;

// Bookmark schema
export const BookmarkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  websiteURL: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.array(TagSchema),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;

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
