import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Textarea({ className, rows = 3, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      rows={rows}
      className={cn(
        'rounded-8 text-preset-4 min-w-full border border-solid p-12 placeholder:text-neutral-800',
        'bg-neutral-0 border-neutral-500',
        'hover:border-neutral-500 hover:bg-neutral-100',
        'focus:bg-neutral-0 focus:ring-3 focus:ring-teal-700',
        'invalid:border-red-800 hover:invalid:border-red-800',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
