import { AllBookmarks } from '../components';

export const AllBookmarksPage = () => {
  return (
    <div className='flex w-full flex-auto flex-col items-start justify-start gap-20 overflow-hidden overflow-y-auto bg-teal-50 p-32'>
      <h1>All Bookmarks</h1>

      <AllBookmarks />
    </div>
  );
};
