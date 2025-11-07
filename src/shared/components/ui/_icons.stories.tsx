import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Design System/Foundations/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.values(IconName),
      description: 'The name of the icon to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the icon wrapper',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: IconName.House,
  },
};

export const AllIcons: Story = {
  name: 'All Icons',
  render: () => (
    <div className='grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8'>
      {Object.values(IconName).map((iconName) => (
        <div key={iconName} className='flex flex-col items-center gap-2'>
          <Icon name={iconName} />
          <span className='text-xs'>{iconName}</span>
        </div>
      ))}
    </div>
  ),
};
