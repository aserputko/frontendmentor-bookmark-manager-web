import { useAllBookmarks } from '../../hooks';
import type { Bookmark } from '../../types';
import { BookmarkCard } from '../BookmarkCard';
import { AllBookmarksEmpty } from './AllBookmarksEmpty';
import { AllBookmarksError } from './AllBookmarksError';
import { AllBookmarksLoading } from './AllBookmarksLoading';

export const AllBookmarks = () => {
  const { data, isLoading, error: isError } = useAllBookmarks();

  const bookmarks: Bookmark[] = data?.data ?? [];

  const isEmpty = bookmarks.length === 0;

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
    <div className='flex min-h-0 w-full flex-1 flex-wrap gap-8'>
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};
