import { BookmarksEmpty } from '../components';

export const AllBookmarks = () => {
  return (
    <div className='flex w-full flex-auto flex-col items-start justify-start gap-4 bg-teal-50 p-8'>
      <h1>All Bookmarks</h1>
      {/* <div className='flex w-full flex-wrap gap-8'>
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
      </div> */}
      <BookmarksEmpty />
    </div>
  );
};
