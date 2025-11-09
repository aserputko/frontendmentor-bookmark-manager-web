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

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }, // Trigger when 100% visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into a single array of bookmarks
  const bookmarks: Bookmark[] = data?.pages.flatMap((page) => page.data) ?? [];

  const isEmpty = !isLoading && bookmarks.length === 0;

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
    <div>
      <div className='flex min-h-0 w-full flex-1 flex-wrap gap-32'>
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
      {/* Sentinel element at the bottom */}
      <div id='sentinel' ref={observerTarget} style={{ height: '24px' }} />
      {hasNextPage && (
        <div className='flex w-full items-center justify-center py-4'>
          {isFetchingNextPage && <Spinner className='size-24' />}
        </div>
      )}
    </div>
  );
};
