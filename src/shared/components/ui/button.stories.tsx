import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as a child element using Radix Slot',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const ErrorButton: Story = {
  name: 'Error',
  args: {
    variant: 'error',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 12h14' />
        <path d='m12 5 7 7-7 7' />
      </svg>
    ),
    'aria-label': 'Arrow right',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-2'>
        <Button variant='default'>Default</Button>
        <Button variant='error'>Error</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='link'>Link</Button>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Button size='sm'>Small</Button>
        <Button size='default'>Default</Button>
        <Button size='lg'>Large</Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button disabled>Disabled</Button>
        <Button variant='outline' disabled>
          Disabled Outline
        </Button>
      </div>
    </div>
  ),
};
