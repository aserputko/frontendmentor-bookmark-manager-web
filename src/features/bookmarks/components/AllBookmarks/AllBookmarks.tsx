import { useEffect, useRef } from 'react';
import { Spinner } from '../../../../shared/components/ui/spinner';
import { BOOKMARKS_DEFAULT_LIMIT, useAllBookmarks } from '../../hooks';
import type { Bookmark } from '../../types';
import { BookmarkCard } from '../BookmarkCard';
import { AllBookmarksEmpty } from './AllBookmarksEmpty';
import { AllBookmarksError } from './AllBookmarksError';
import { AllBookmarksLoading } from './AllBookmarksLoading';

export const AllBookmarks = () => {
  const {
    data,
    isLoading,
    error: isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllBookmarks(BOOKMARKS_DEFAULT_LIMIT);

  // Flatten all pages into a single array of bookmarks
  const bookmarks: Bookmark[] = data?.pages.flatMap((page) => page.data) ?? [];

  const isEmpty = !isLoading && bookmarks.length === 0;
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when user scrolls to bottom
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px', // Start loading slightly before reaching the bottom
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <AllBookmarksLoading />;
  }

  if (isError) {
    return <AllBookmarksError />;
  }

  if (isEmpty) {
    return <AllBookmarksEmpty />;
  }

  return (
    <div className='flex min-h-0 w-full flex-1 flex-col'>
      <div className='flex min-h-0 w-full flex-1 flex-wrap gap-8'>
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
      {/* Sentinel element to trigger loading next page */}
      <div ref={sentinelRef} className='h-1 w-full' />
      {/* Loading indicator at bottom */}
      {isFetchingNextPage && (
        <div className='flex w-full items-center justify-center py-4'>
          <Spinner className='size-6' />
        </div>
      )}
    </div>
  );
};
