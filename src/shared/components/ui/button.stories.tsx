import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonVariant } from './button';
import { IconName } from './icon';

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button CTA',
    size: 'sm',
    variant: ButtonVariant.Primary,
    leftIcon: IconName.Plus,
    rightIcon: IconName.Plus,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
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
    leftIcon: {
      control: 'select',
      options: Object.values(IconName),
      description: 'The name of the left icon to display',
    },
    rightIcon: {
      control: 'select',
      options: Object.values(IconName),
      description: 'The name of the right icon to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

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

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-2'>
        <Button variant='primary'>Default</Button>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Button size='sm'>Small</Button>
        <Button size='lg'>Large</Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
};
