import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../shared/components/ui/avatar';
import { Button } from '../../../../shared/components/ui/button';
import { Input } from '../../../../shared/components/ui/input';
import { useDebounce } from '../../../../shared/hooks/use-debounce';
import { AddBookmarkDialog } from '../AddBookmarkDialog';

export const BookmarksNavbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchValue = searchParams.get('s') || '';
  const [searchValue, setSearchValue] = useState(urlSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 350);

  // Update URL when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue !== urlSearchValue) {
      if (debouncedSearchValue) {
        setSearchParams({ s: debouncedSearchValue }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  }, [debouncedSearchValue, urlSearchValue, setSearchParams]);

  return (
    <>
      <nav className='flex w-full items-center gap-4 border-b border-solid px-8 py-4'>
        <div className='flex w-full max-w-[320px]'>
          <Input
            placeholder='Search by title...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className='flex flex-auto'></div>
        <Button variant='primary' onClick={() => setIsDialogOpen(true)}>
          <Plus />
          Add Bookmark
        </Button>

        <Avatar>
          <AvatarImage src='https://avatars.githubusercontent.com/u/761589' alt='Andrii Serputko' />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </nav>

      <AddBookmarkDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
