import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: {
        ...themes.dark,
        appBg: '#0a0a0a',
        appContentBg: '#0f0f0f',
      },
      light: {
        ...themes.normal,
        appBg: '#ffffff',
        appContentBg: '#ffffff',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-full w-full p-4 bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
};

export default preview;