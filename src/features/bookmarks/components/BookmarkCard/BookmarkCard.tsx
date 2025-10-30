import { cn } from '../../../../shared/lib/utils';
import type { Bookmark } from '../../types';

type BookmarkCardProps = {
  bookmark: Bookmark;
  className?: string;
};

export const BookmarkCard = ({ bookmark, className }: BookmarkCardProps) => {
  return (
    <div className={cn('flex w-[31%] flex-col gap-4 rounded-lg bg-white p-4 shadow-md', className)}>
      <h2 className='text-lg font-semibold'>{bookmark.title}</h2>

      <a
        href={bookmark.websiteURL}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm hover:underline'
      >
        {bookmark.websiteURL}
      </a>

      {bookmark.description && <p className='text-sm'>{bookmark.description}</p>}

      {bookmark.tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {bookmark.tags.map((tag) => (
            <span key={tag.id} className='rounded-full bg-gray-100 px-2 py-1 text-xs'>
              {tag.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
