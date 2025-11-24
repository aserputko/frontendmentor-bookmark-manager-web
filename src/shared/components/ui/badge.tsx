import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Badge({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(
        'text-preset-5 rounded-full border border-solid px-[7px] py-px',
        'border-neutral-300 bg-neutral-100 text-neutral-600',
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
