import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Navbar() {
  return (
    <nav className='flex w-full items-center gap-4 border-b border-solid px-8 py-4'>
      <Input placeholder='Search by title...' className='w-[320px]' />

      <div className='flex flex-auto'></div>
      <Button variant='default'>
        <Plus className='' />
        Add Bookmark
      </Button>

      <Avatar>
        <AvatarImage src='https://avatars.githubusercontent.com/u/761589' alt='Andrii Serputko' />
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
    </nav>
  );
}
