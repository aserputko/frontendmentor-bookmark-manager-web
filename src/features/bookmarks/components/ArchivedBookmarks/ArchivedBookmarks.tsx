import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '../../../../shared/components/ui/spinner';
import { useArchivedBookmarks } from '../../hooks';
import { DEFAULT_PAGE_SIZE, type Bookmark } from '../../types';
import { BookmarkCard } from '../BookmarkCard';
import { BookmarksEmptyState } from '../BookmarksEmptyState';
import { BookmarksErrorState } from '../BookmarksErrorState';
import { BookmarksLoadingState } from '../BookmarksLoadingState';

export const ArchivedBookmarks = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('s') || '';
  const {
    data,
    isLoading,
    error: isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useArchivedBookmarks(DEFAULT_PAGE_SIZE, searchValue);

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
    return <BookmarksLoadingState />;
  }

  if (isError) {
    return <BookmarksErrorState />;
  }

  if (isEmpty) {
    return <BookmarksEmptyState />;
  }

  return (
    <div>
      <div className='flex min-h-0 w-full flex-1 flex-wrap gap-8'>
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
      {/* Sentinel element at the bottom */}
      <div id='sentinel' ref={observerTarget} style={{ height: '24px' }} />
      {hasNextPage && (
        <div className='flex w-full items-center justify-center py-4'>
          {isFetchingNextPage && <Spinner className='size-6' />}
        </div>
      )}
    </div>
  );
};
