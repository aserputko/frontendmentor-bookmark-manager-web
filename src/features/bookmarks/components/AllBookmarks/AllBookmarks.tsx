import { useAllBookmarks } from '../../hooks';
import { BookmarksEmpty } from '../BookmarksEmpty';

export const AllBookmarks = () => {
  const { data, isLoading, error } = useAllBookmarks();

  const bookmarks = data?.data ?? [];

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
          <div
            key={bookmark.id}
            className='flex w-[31%] flex-col gap-4 rounded-lg bg-white p-4 shadow-md'
          >
            <h2 className='text-lg font-semibold'>{bookmark.title}</h2>
            {bookmark.description && (
              <p className='text-sm text-gray-600'>{bookmark.description}</p>
            )}
            <a
              href={bookmark.websiteURL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-blue-600 hover:underline'
            >
              {bookmark.websiteURL}
            </a>
            {bookmark.tags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {bookmark.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700'
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
