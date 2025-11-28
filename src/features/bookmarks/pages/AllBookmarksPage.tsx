import { useState } from 'react';
import { AllBookmarks } from '../components';
import { BookmarksSortBy } from '../components/BookmarksSortBy';

export const AllBookmarksPage = () => {
  const [sortBy, setSortBy] = useState<string>('recently-added');

  return (
    <div className='flex w-full flex-auto flex-col items-start justify-start gap-5 overflow-hidden overflow-y-auto bg-teal-50 p-8'>
      <div className='flex w-full items-center justify-between'>
        <h1>All Bookmarks</h1>

        <BookmarksSortBy value={sortBy} onChange={setSortBy} />
      </div>

      <AllBookmarks sortBy={sortBy} />
    </div>
  );
};
