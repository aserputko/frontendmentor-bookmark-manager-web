import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type='checkbox'
      className={cn(
        'rounded-4 size-16 border border-solid',
        'bg-neutral-0 border-neutral-500 accent-teal-700',
        'hover:border-neutral-500 hover:bg-neutral-100 hover:accent-teal-800',
        'active:bg-neutral-0',
        className,
      )}
      {...props}
    />
  );
}

export { Checkbox };
