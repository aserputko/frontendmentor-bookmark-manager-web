import { Spinner } from '../../../../shared/components/ui/spinner';

export const BookmarksLoadingState = () => {
  return (
    <div className='flex w-full flex-auto flex-col items-center justify-center gap-4 bg-teal-50 p-8'>
      <Spinner className='size-8' />
      <p>Loading bookmarks...</p>
    </div>
  );
};
