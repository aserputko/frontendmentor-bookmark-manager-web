import { AllBookmarks } from '../components';

export const AllBookmarksPage = () => {
  return (
    <div className='flex w-full flex-auto flex-col items-start justify-start gap-4 bg-teal-50 p-8'>
      <h1>All Bookmarks</h1>

      <AllBookmarks />
    </div>
  );
};
