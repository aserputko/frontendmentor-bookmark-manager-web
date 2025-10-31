import { z } from 'zod';

// Tag schema
export const TagSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;
