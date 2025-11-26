import { Bookmark } from 'lucide-react';

export const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-neutral-0 flex size-8 items-center justify-center rounded-lg bg-teal-700'>
        <Bookmark strokeWidth={2.5} size={20} />
      </span>
      <h2 className='text-preset-2 dark:text-neutral-0 text-neutral-900'>Bookmark Manager</h2>
    </div>
  );
};
