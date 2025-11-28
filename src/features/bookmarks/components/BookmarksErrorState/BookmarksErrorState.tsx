import { FileWarning } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../../../../shared/components/ui/empty';

export const BookmarksErrorState = () => {
  return (
    <div className='flex w-full flex-auto flex-col items-center justify-center gap-4 bg-teal-50 p-8'>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <FileWarning />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>Please try to reload this page.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
};
