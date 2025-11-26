import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AddBookmarkFormSchema, type AddBookmarkForm } from '../../types';

interface BookmarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  informer?: string;
  submitButtonText: string;
  defaultValues?: Partial<AddBookmarkForm>;
  onSubmit: (data: AddBookmarkForm) => Promise<void>;
  isSubmitting?: boolean;
}

export function BookmarkDialog({
  open,
  onOpenChange,
  title,
  informer,
  submitButtonText,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: BookmarkDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddBookmarkForm>({
    resolver: zodResolver(AddBookmarkFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      websiteURL: '',
      tags: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        defaultValues || {
          title: '',
          description: '',
          websiteURL: '',
          tags: '',
        },
      );
    }
  }, [open, defaultValues, reset]);

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {informer && <DialogDescription>{informer}</DialogDescription>}
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
            <Button type='button' variant='secondary' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
