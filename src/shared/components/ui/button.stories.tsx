import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonVariant, type ButtonProps } from './button';
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
    size: ButtonSize.Large,
    variant: ButtonVariant.Primary,
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

export const Default: Story = {
  args: {
    children: 'Button CTA',
    size: ButtonSize.Large,
    variant: ButtonVariant.Primary,
    leftIcon: IconName.Plus,
    rightIcon: IconName.Plus,
  },
};

export const Size: Story = {
  name: 'Sizes',
  render: (args: ButtonProps) => (
    <div className='flex flex-wrap items-center gap-4'>
      <Button {...args} size={ButtonSize.Small}>
        Small Button
      </Button>
      <Button {...args} size={ButtonSize.Large}>
        Large Button
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  name: 'Variants',
  render: (args: ButtonProps) => (
    <div className='flex flex-wrap items-center gap-4'>
      <Button {...args} variant={ButtonVariant.Primary}>
        Primary Button
      </Button>
      <Button {...args} variant={ButtonVariant.Secondary}>
        Secondary Button
      </Button>
      <Button {...args} variant={ButtonVariant.Error}>
        Error Button
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const IconButton: Story = {
  render: (args: ButtonProps) => (
    <div className='flex flex-wrap items-center gap-4'>
      <Button {...args} size={ButtonSize.Icon} leftIcon={IconName.Plus} />
      <Button {...args} size={ButtonSize.Icon} leftIcon={IconName.Search} />
      <Button {...args} size={ButtonSize.Icon} leftIcon={IconName.Edit} />
    </div>
  ),
};
