import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../shared/components/ui/avatar';
import { Button } from '../../../../shared/components/ui/button';
import { Input } from '../../../../shared/components/ui/input';
import { AddBookmarkDialog } from '../AddBookmarkDialog';

export const BookmarksNavbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <nav className='flex w-full items-center gap-4 border-b border-solid px-8 py-4'>
        <Input placeholder='Search by title...' className='w-[320px]' />

        <div className='flex flex-auto'></div>
        <Button variant='default' onClick={() => setIsDialogOpen(true)}>
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
