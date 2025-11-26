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
    'border-2 border-solid rounded-lg text-neutral-0',
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
        [ButtonSize.Small]: 'px-[10px] py-[8px] max-h-[42px] min-h-[42px]',
        [ButtonSize.Large]: 'px-[16px] py-[10px] max-h-[46px] min-h-[46px]',
        [ButtonSize.Icon]: 'p-[6px] max-h-8 min-h-8 h-8 w-8 min-w-8 max-w-8',
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
