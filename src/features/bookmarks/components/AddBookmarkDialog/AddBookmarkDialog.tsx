import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddBookmark } from '../../hooks';
import { AddBookmarkFormSchema, type AddBookmarkForm } from '../../types';

interface AddBookmarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBookmarkDialog({ open, onOpenChange }: AddBookmarkDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddBookmarkForm>({
    resolver: zodResolver(AddBookmarkFormSchema),
    defaultValues: {
      title: '',
      description: '',
      websiteURL: '',
      tags: '',
    },
  });

  const addBookmarkMutation = useAddBookmark();

  const onSubmit = async (data: AddBookmarkForm) => {
    try {
      await addBookmarkMutation.mutateAsync(data);
      toast.success('The bookmark is saved');
      reset();
      onOpenChange(false);
    } catch {
      toast.error('The bookmark is not saved, Please try again');
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
          <Field>
            <FieldLabel htmlFor='title'>Title</FieldLabel>
            <FieldContent>
              <Input id='title' {...register('title')} aria-invalid={!!errors.title} />
              <FieldError errors={errors.title ? [errors.title] : undefined} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor='description'>Description</FieldLabel>
            <FieldContent>
              <Input
                id='description'
                {...register('description')}
                aria-invalid={!!errors.description}
              />
              <FieldError errors={errors.description ? [errors.description] : undefined} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor='websiteURL'>Website URL</FieldLabel>
            <FieldContent>
              <Input
                id='websiteURL'
                type='url'
                {...register('websiteURL')}
                aria-invalid={!!errors.websiteURL}
                maxLength={1024}
              />
              <FieldError errors={errors.websiteURL ? [errors.websiteURL] : undefined} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor='tags'>Tags (comma-separated)</FieldLabel>
            <FieldContent>
              <Input
                id='tags'
                {...register('tags')}
                placeholder='JavaScript, Node.js, Framework'
                aria-invalid={!!errors.tags}
              />
              <FieldError errors={errors.tags ? [errors.tags] : undefined} />
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              Add Bookmark
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
