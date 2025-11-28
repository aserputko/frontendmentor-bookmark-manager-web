import { Bookmark as BookmarkIcon } from 'lucide-react';
import { Icon, IconName, IconSize } from '../../../../shared/components/ui/icon';
import { cn } from '../../../../shared/lib/utils';
import type { Bookmark } from '../../types';
import { getHostnameFromURL } from '../../utils';
import { BookmarkMenu } from '../BookmarkMenu';

type BookmarkCardProps = {
  bookmark: Bookmark;
  className?: string;
};

export const BookmarkCard = ({ bookmark, className }: BookmarkCardProps) => {
  const isArchived = bookmark.archived ?? false;
  const isPinned = bookmark.pinned ?? false;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={cn(
          'bg-neutral-0 flex w-[338px] flex-col gap-4 rounded-lg shadow-md transition-shadow hover:shadow-lg',
          className,
        )}
      >
        <div className='flex w-full gap-3 px-4 pt-4'>
          <span className='text-neutral-0 flex size-11 min-h-11 min-w-11 items-center justify-center rounded-lg bg-teal-700'>
            <BookmarkIcon strokeWidth={2.5} size={20} />
          </span>
          <div className='flex max-w-[206px] flex-auto flex-col gap-1'>
            <h2
              className='text-preset-2 line-clamp-1 truncate text-neutral-900'
              title={bookmark.title}
            >
              {bookmark.title}
            </h2>
            <a
              href={bookmark.websiteURL}
              title={bookmark.websiteURL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-preset-5 line-clamp-1 truncate text-neutral-800'
              onClick={handleLinkClick}
            >
              {getHostnameFromURL(bookmark.websiteURL)}
            </a>
          </div>

          <BookmarkMenu bookmark={bookmark} />
        </div>

        <div className='mx-4 flex h-px max-h-px flex-auto border-b border-solid border-neutral-300'></div>

        <div className='flex min-h-[120px] flex-auto flex-col gap-4 px-4'>
          <p className='text-preset-4 text-neutral-800'>{bookmark.description}</p>

          {bookmark.tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {bookmark.tags.map((tag) => (
                <span
                  key={tag.id}
                  className='text-preset-5 rounded bg-neutral-100 px-2 py-[2px] text-neutral-800'
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='flex h-px max-h-px flex-auto border-b border-solid border-neutral-300'></div>

        <div className='flex gap-4 px-4 pb-3'>
          <span className='flex items-center justify-center gap-1'>
            <Icon className='mb-[2px] text-neutral-800' name={IconName.Eye} size={IconSize.Small} />
            <span className='text-preset-5 text-neutral-800'>1</span>
          </span>

          <span className='flex items-center justify-center gap-1'>
            <Icon
              className='mb-[2px] text-neutral-800'
              name={IconName.Clock}
              size={IconSize.Small}
            />
            <span className='text-preset-5 text-neutral-800'>
              {new Date(bookmark.updatedAt).toLocaleDateString('en-en', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </span>

          <span className='flex items-center justify-center gap-1'>
            <Icon
              className='mb-[2px] text-neutral-800'
              name={IconName.Calendar}
              size={IconSize.Small}
            />
            <span className='text-preset-5 text-neutral-800'>
              {new Date(bookmark.createdAt).toLocaleDateString('en-en', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </span>

          <span className='flex flex-auto'></span>

          {isPinned && (
            <span className='flex items-center justify-center gap-1'>
              <Icon
                className='mb-[2px] text-neutral-800'
                name={IconName.Pin}
                size={IconSize.Medium}
              />
            </span>
          )}

          {isArchived && (
            <span className='flex items-center justify-center gap-1'>
              <span className='text-preset-5 rounded bg-neutral-100 px-1 text-neutral-800'>
                Archived
              </span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};
