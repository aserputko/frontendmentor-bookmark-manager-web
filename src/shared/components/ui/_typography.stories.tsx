import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className='text-body'>The quick brown fox jumps over the lazy dog.</div>,
};

export const Headings: Story = {
  render: () => (
    <div className='space-y-24'>
      <h1>Heading 1 - Text Preset 1</h1>
      <h1 className='font-semibold'>Heading 1 - Text Preset 1 (font-semibold)</h1>
      <h2>Heading 2 - Text Preset 2</h2>
      <h2 className='font-semibold'>Heading 2 - Text Preset 2 (font-semibold)</h2>
      <h3>Heading 3 - Text Preset 3</h3>
      <h3 className='font-semibold'>Heading 3 - Text Preset 3 (font-semibold)</h3>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris.
    </p>
  ),
};
export const BodyTextSemibold: Story = {
  render: () => (
    <p className='font-semibold'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris.
    </p>
  ),
};

export const SmallText: Story = {
  render: () => (
    <small>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris.
    </small>
  ),
};
