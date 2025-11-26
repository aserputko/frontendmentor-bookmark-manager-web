import type { Meta, StoryObj } from '@storybook/react';
import { IconName } from '../ui/icon';
import { NavigationItem } from './navigation-item';

const meta: Meta<typeof NavigationItem> = {
  title: 'Design System/Components/NavigationItem',
  component: NavigationItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    iconName: IconName.House,
    title: 'Home',
    count: 6,
    active: false,
    onClick: () => {},
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: Object.values(IconName),
      description: 'The name of the icon to display',
    },
    title: {
      control: 'text',
      description: 'The navigation item title',
    },
    count: {
      control: 'number',
      description: 'The count badge value',
    },
    active: {
      control: 'boolean',
      description: 'Whether the navigation item is active',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when the item is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {
  args: {
    iconName: IconName.House,
    title: 'Home',
    count: 6,
    active: false,
    onClick: () => {},
  },
};

export const Active: Story = {
  name: 'Active State',
  args: {
    iconName: IconName.House,
    title: 'Home',
    count: 6,
    active: true,
    onClick: () => {},
  },
};
