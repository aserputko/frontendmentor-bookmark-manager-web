import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    defaultChecked: false,
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked by default (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute of the checkbox',
    },
    value: {
      control: 'text',
      description: 'The value attribute of the checkbox',
    },
    id: {
      control: 'text',
      description: 'The id attribute of the checkbox',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the checkbox is invalid (for error state)',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the checkbox',
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the checkbox',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  name: 'Checked',
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  name: 'Disabled Checked',
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Required: Story = {
  name: 'Required',
  args: {
    required: true,
    defaultChecked: false,
  },
};

export const Invalid: Story = {
  name: 'Invalid',
  args: {
    'aria-invalid': true,
    defaultChecked: false,
  },
};
