import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName, IconSize } from './icon';

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
    size: {
      control: 'select',
      options: Object.values(IconSize),
      description: 'The size of the icon',
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
    <div className='grid grid-cols-4 gap-6 md:grid-cols-6 lg:grid-cols-8'>
      {Object.values(IconName).map((iconName) => (
        <div key={iconName} className='flex flex-col items-center gap-2'>
          <Icon name={iconName} />
          <span className='text-xs'>{iconName}</span>
        </div>
      ))}
    </div>
  ),
};

export const Small: Story = {
  name: 'Small',
  args: {
    name: IconName.House,
    size: IconSize.Small,
  },
};

export const Large: Story = {
  name: 'Large',
  args: {
    name: IconName.House,
    size: IconSize.Large,
  },
};

export const SizeComparison: Story = {
  name: 'Size Comparison',
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='flex flex-col items-center gap-2'>
        <Icon name={IconName.House} size={IconSize.Small} />
        <span className='text-xs'>Small</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name={IconName.House} size={IconSize.Large} />
        <span className='text-xs'>Large</span>
      </div>
    </div>
  ),
};
