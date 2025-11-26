import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const colorDefinitions = [
  {
    name: 'neutral-900',
    light: '#051513',
    dark: '#001414',
  },
  {
    name: 'neutral-800',
    light: '#4C5C59',
    dark: '#001F1F',
  },
  {
    name: 'neutral-600',
    light: '#002E2D',
    dark: '#002E2D',
  },
  {
    name: 'neutral-500',
    light: '#899492',
    dark: '#004241',
  },
  {
    name: 'neutral-400',
    light: '#C0CFCC',
    dark: '#004746',
  },
  {
    name: 'neutral-300',
    light: '#DDE9E7',
    dark: '#00706E',
  },
  {
    name: 'neutral-100',
    light: '#E8F0EF',
    dark: '#B1B9B9',
  },
  {
    name: 'neutral-0',
    light: '#FFFFFF',
    dark: '#FFFFFF',
  },
  {
    name: 'teal-700',
    light: '#014745',
    dark: '#014745',
  },
  {
    name: 'teal-800',
    light: '#013C3B',
    dark: '#013C3B',
  },
  {
    name: 'red-600',
    light: '#FD4740',
    dark: '#FD4740',
  },
  {
    name: 'red-800',
    light: '#CB0A04',
    dark: '#CB0A04',
  },
];

const ColorSwatch = ({ name, light, dark }: { name: string; light: string; dark: string }) => {
  // Determine if text should be white based on color brightness
  const isDarkColor =
    name.includes('900') ||
    name.includes('800') ||
    name.includes('600') ||
    name.includes('700') ||
    name.includes('red');

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center gap-4'>
        <div
          className='flex h-[96px] w-[230px] items-center justify-center rounded-lg border border-neutral-300'
          style={{
            backgroundColor: light,
          }}
        >
          <span
            className={`text-xs font-medium ${isDarkColor ? 'text-white' : 'text-neutral-900'}`}
          >
            {name}
          </span>
        </div>
        <div className='flex flex-col'>
          <div className='text-sm font-semibold'>{name}</div>
          <div className='text-muted-foreground text-xs'>
            <div>Light: {light}</div>
            <div>Dark: {dark}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  name: 'Colors',
  render: () => (
    <div className='space-y-8'>
      <div>
        <h2 className='mb-4 text-2xl font-bold'>Neutral Colors</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {colorDefinitions
            .filter((color) => color.name.startsWith('neutral'))
            .map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                light={color.light}
                dark={color.dark}
              />
            ))}
        </div>
      </div>

      <div>
        <h2 className='mb-4 text-2xl font-bold'>Teal Colors</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {colorDefinitions
            .filter((color) => color.name.startsWith('teal'))
            .map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                light={color.light}
                dark={color.dark}
              />
            ))}
        </div>
      </div>

      <div>
        <h2 className='mb-4 text-2xl font-bold'>Red Colors</h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {colorDefinitions
            .filter((color) => color.name.startsWith('red'))
            .map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                light={color.light}
                dark={color.dark}
              />
            ))}
        </div>
      </div>
    </div>
  ),
};
