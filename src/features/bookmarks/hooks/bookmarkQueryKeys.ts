export const bookmarkQueryKeys = {
  all: () => ['bookmarks', 'infinite'],
  active: (search: string) => [...bookmarkQueryKeys.all(), search] as const,
  archived: (search: string) => [...bookmarkQueryKeys.all(), 'archived', search] as const,
} as const;
