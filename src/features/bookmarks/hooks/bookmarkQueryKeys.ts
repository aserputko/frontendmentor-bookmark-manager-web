export const bookmarkQueryKeys = {
  all: () => ['bookmarks', 'infinite'],
  active: (sortBy: string, search: string) => [...bookmarkQueryKeys.all(), sortBy, search] as const,
  archived: (sortBy: string, search: string) =>
    [...bookmarkQueryKeys.all(), 'archived', sortBy, search] as const,
} as const;
