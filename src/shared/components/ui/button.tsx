import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { Icon, type IconName } from './icon';

export const ButtonVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
  Error: 'error',
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  Small: 'sm',
  Large: 'lg',
  Icon: 'icon',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center shrink-0 gap-4 text-preset-3',
    'border-2 border-solid rounded-8 text-neutral-0',
    'whitespace-nowrap outline-none transition-all',
    'cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
  ),
  {
    variants: {
      variant: {
        [ButtonVariant.Primary]: cn(
          'bg-teal-700 border-teal-700',
          'hover:bg-teal-800 hover:border-teal-800',
          'active:bg-teal-700 active:border-white active:ring-2 active:ring-teal-700',
        ),
        [ButtonVariant.Secondary]: cn(
          'bg-neutral-0 text-neutral-900 border-neutral-400',
          'hover:neutral-100 hover:border-neutral-400',
          'active:bg-neutral-0 active:border-white active:ring-2 active:ring-teal-700',

          'dark:bg-neutral-800 dark:text-neutral-0 dark:border-neutral-400',
          'dark:hover:bg-neutral-600 dark:hover:border-neutral-500',
          'dark:active:bg-neutral-800 dark:active:border-neutral-500 dark:active:ring-2 dark:active:ring-neutral-800',
        ),
        [ButtonVariant.Error]: cn(
          'bg-red-800 border-red-800',
          'hover:bg-red-800 hover:border-red-800',
          'active:bg-red-800 active:border-white active:ring-2 active:ring-red-800',
        ),
      },
      size: {
        [ButtonSize.Small]: 'px-10 py-8 max-h-[42px] min-h-[42px]',
        [ButtonSize.Large]: 'px-16 py-10 max-h-[46px] min-h-[46px]',
        [ButtonSize.Icon]: 'p-6 max-h-32 min-h-32px h-32 w-32 min-w-32 max-w-32',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.Primary,
      size: ButtonSize.Large,
    },
  },
);

export type ButtonProps = React.ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
};

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const isIconButton = size === ButtonSize.Icon;

  const renderButton = () => (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {leftIcon && <Icon name={leftIcon} />}
      {children}
      {rightIcon && <Icon name={rightIcon} />}
    </Comp>
  );

  const renderIconButton = () => (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant: ButtonVariant.Secondary, size, className }))}
      {...props}
    >
      {leftIcon && <Icon name={leftIcon} />}
    </Comp>
  );

  return isIconButton ? renderIconButton() : renderButton();
};
