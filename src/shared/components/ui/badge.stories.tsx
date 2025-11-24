import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '6',
  },
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Render as a child component using Radix Slot',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'The badge content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const WithText: Story = {
  name: 'With Text',
  args: {
    children: 'New',
  },
};

export const LongText: Story = {
  name: 'Long Text',
  args: {
    children: 'This is a longer badge text',
  },
};
