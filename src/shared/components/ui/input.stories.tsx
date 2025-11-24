import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
        'color',
        'file',
        'range',
      ],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'The value of the input',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute of the input',
    },
    id: {
      control: 'text',
      description: 'The id attribute of the input',
    },
    autoComplete: {
      control: 'text',
      description: 'The autocomplete attribute',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters',
    },
    minLength: {
      control: 'number',
      description: 'Minimum number of characters',
    },
    min: {
      control: 'number',
      description: 'Minimum value (for number/date inputs)',
    },
    max: {
      control: 'number',
      description: 'Maximum value (for number/date inputs)',
    },
    step: {
      control: 'number',
      description: 'Step value (for number inputs)',
    },
    pattern: {
      control: 'text',
      description: 'Pattern for validation',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the input is invalid (for error state)',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the input',
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

export const WithValue: Story = {
  name: 'With Value',
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    value: 'Sample text',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  name: 'Read Only',
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    value: 'Read-only value',
    readOnly: true,
  },
};

export const Required: Story = {
  name: 'Required',
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    required: true,
  },
};
