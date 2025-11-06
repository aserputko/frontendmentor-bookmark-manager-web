import { toast } from 'sonner';
import { useAddBookmark } from '../../hooks';
import type { AddBookmarkForm } from '../../types';
import { BookmarkDialog } from '../BookmarkDialog/BookmarkDialog';

interface AddBookmarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBookmarkDialog({ open, onOpenChange }: AddBookmarkDialogProps) {
  const addBookmarkMutation = useAddBookmark();

  const onSubmit = async (data: AddBookmarkForm) => {
    try {
      await addBookmarkMutation.mutateAsync(data);
      toast.success('The bookmark is saved');
      onOpenChange(false);
    } catch {
      toast.error('The bookmark is not saved, Please try again');
    }
  };

  return (
    <BookmarkDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Add Bookmark'
      submitButtonText='Add Bookmark'
      onSubmit={onSubmit}
      isSubmitting={addBookmarkMutation.isPending}
    />
  );
}
