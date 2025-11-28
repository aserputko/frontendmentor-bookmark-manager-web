export const bookmarkQueryKeys = {
  all: () => ['bookmarks', 'infinite'],
  search: (search: string) => [...bookmarkQueryKeys.all(), search] as const,
} as const;
