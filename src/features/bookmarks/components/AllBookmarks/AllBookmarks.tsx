import { useAllBookmarks } from '../../hooks';
import type { Bookmark } from '../../types';
import { BookmarkCard } from '../BookmarkCard';
import { BookmarksEmpty } from '../BookmarksEmpty';

export const AllBookmarks = () => {
  const { data, isLoading, error } = useAllBookmarks();

  const bookmarks: Bookmark[] = data?.data ?? [];

  if (isLoading) {
    return (
      <div className='flex w-full flex-auto flex-col items-center justify-center gap-4 bg-teal-50 p-8'>
        <p>Loading bookmarks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex w-full flex-auto flex-col items-center justify-center gap-4 bg-teal-50 p-8'>
        <p>Error loading bookmarks. Please try again.</p>
      </div>
    );
  }

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className='flex w-full flex-auto flex-col items-start justify-start gap-4 bg-teal-50 p-8'>
        <h1>All Bookmarks</h1>
        <BookmarksEmpty />
      </div>
    );
  }

  return (
    <div className='flex w-full flex-auto flex-col items-start justify-start gap-4 bg-teal-50 p-8'>
      <h1>All Bookmarks</h1>
      <div className='flex w-full flex-wrap gap-8'>
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
};
