import { z } from 'zod';
import { TagSchema } from './tag.types';

// Bookmark schema
export const BookmarkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  websiteURL: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.array(TagSchema),
  archived: z.boolean().optional(),
  pinned: z.boolean().optional(),
  visitedCount: z.number(),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;

// Add bookmark form schema
export const AddBookmarkFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(280, 'Title must be at most 280 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(280, 'Description must be at most 280 characters'),
  websiteURL: z
    .string()
    .min(1, 'Website URL is required')
    .max(1024, 'Website URL must be at most 1024 characters')
    .url('Must be a valid URL'),
  tags: z.string().optional(),
});

export type AddBookmarkForm = z.infer<typeof AddBookmarkFormSchema>;

// Add bookmark API request payload schema
export const AddBookmarkRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  websiteURL: z.string(),
  tags: z.array(z.string()),
});

export type AddBookmarkRequest = z.infer<typeof AddBookmarkRequestSchema>;
