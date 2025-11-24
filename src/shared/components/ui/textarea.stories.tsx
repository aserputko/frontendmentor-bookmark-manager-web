import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Design System/Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'The value of the textarea',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value of the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    name: {
      control: 'text',
      description: 'The name attribute of the textarea',
    },
    id: {
      control: 'text',
      description: 'The id attribute of the textarea',
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
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    cols: {
      control: 'number',
      description: 'Visible width of the textarea',
    },
    wrap: {
      control: 'select',
      options: ['hard', 'soft', 'off'],
      description: 'How the text should be wrapped',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Whether the textarea is invalid (for error state)',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the textarea',
    },
    'aria-describedby': {
      control: 'text',
      description: 'ID of element that describes the textarea',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  name: 'With Value',
  args: {
    placeholder: 'Enter text...',
    value: 'Sample text',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  name: 'Read Only',
  args: {
    placeholder: 'Enter text...',
    value: 'Read-only value',
    readOnly: true,
  },
};

export const Required: Story = {
  name: 'Required',
  args: {
    placeholder: 'Enter text...',
    required: true,
  },
};
