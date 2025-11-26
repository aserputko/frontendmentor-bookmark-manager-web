import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import React, { useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import '../src/index.css';

// Component to load Manrope font in Storybook
// eslint-disable-next-line react-refresh/only-export-components
const FontLoader = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Check if font is already loaded
    const existingLink = document.querySelector(
      'link[href*="fonts.googleapis.com/css2?family=Manrope"]',
    );
    if (existingLink) {
      return;
    }

    // Add preconnect links
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    // Add font stylesheet
    const fontLink = document.createElement('link');
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }, []);

  return <>{children}</>;
};

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
    (Story) => {
      const isDark = useDarkMode();
      console.log('isDark', isDark);
      return (
        <FontLoader>
          <div
            key={isDark ? 'dark' : 'light'}
            className={`bg-background text-foreground h-full w-full p-6 ${isDark ? 'dark' : 'light'}`}
          >
            <Story />
          </div>
        </FontLoader>
      );
    },
  ],
};

export default preview;
