import { ArchivedBookmarks } from '../components';

export const ArchivedBookmarksPage = () => {
  return (
    <div className='flex w-full flex-auto flex-col items-start justify-start gap-5 overflow-hidden overflow-y-auto bg-teal-50 p-8'>
      <h1>Archived Bookmarks</h1>

      <ArchivedBookmarks />
    </div>
  );
};
