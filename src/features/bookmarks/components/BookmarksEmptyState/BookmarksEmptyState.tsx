import { Bookmark, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../../../../shared/components/ui/empty';
import { AddBookmarkDialog } from '../AddBookmarkDialog';

export const BookmarksEmptyState = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className='flex w-full flex-auto flex-col items-center justify-center gap-4'>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <Bookmark />
            </EmptyMedia>
            <EmptyTitle>No Bookmarks Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t added any bookmarks yet. Get started by adding your first bookmark.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className='flex'>
              <Button variant='primary' size='lg' onClick={() => setIsDialogOpen(true)}>
                <Plus />
                Add Bookmark
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>

      <AddBookmarkDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
