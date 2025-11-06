import { toast } from 'sonner';
import { useEditBookmark } from '../../hooks';
import type { AddBookmarkForm, Bookmark } from '../../types';
import { BookmarkDialog } from '../BookmarkDialog/BookmarkDialog';

interface EditBookmarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookmark: Bookmark;
}

export function EditBookmarkDialog({ open, onOpenChange, bookmark }: EditBookmarkDialogProps) {
  const editBookmarkMutation = useEditBookmark(bookmark.id);

  const onSubmit = async (data: AddBookmarkForm) => {
    try {
      await editBookmarkMutation.mutateAsync(data);
      toast.success('The bookmark is updated');
      onOpenChange(false);
    } catch {
      toast.error('The bookmark is not updated, Please try again');
    }
  };

  const defaultValues: Partial<AddBookmarkForm> = {
    title: bookmark.title,
    description: bookmark.description || '',
    websiteURL: bookmark.websiteURL,
    tags: bookmark.tags.map((tag) => tag.title).join(', '),
  };

  return (
    <BookmarkDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Edit bookmark'
      informer='Update your saved link details — change the title, description, URL, or tags anytime.'
      submitButtonText='Save Bookmark'
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isSubmitting={editBookmarkMutation.isPending}
    />
  );
}
