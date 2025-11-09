import { useState } from 'react';
import { cn } from '../../../../shared/lib/utils';
import type { Bookmark } from '../../types';
import { EditBookmarkDialog } from '../EditBookmarkDialog/EditBookmarkDialog';

type BookmarkCardProps = {
  bookmark: Bookmark;
  className?: string;
};

export const BookmarkCard = ({ bookmark, className }: BookmarkCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={cn(
          'flex w-[31%] cursor-pointer flex-col gap-16 rounded-lg bg-white p-16 shadow-md transition-shadow hover:shadow-lg',
          className,
        )}
      >
        <h2 className='text-lg font-semibold'>{bookmark.title}</h2>

        <a
          href={bookmark.websiteURL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm hover:underline'
          onClick={handleLinkClick}
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

      <EditBookmarkDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        bookmark={bookmark}
      />
    </>
  );
};
