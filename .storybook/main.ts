import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const tailwindcss = (await import('@tailwindcss/vite')).default;
    const { mergeConfig } = await import('vite');
    const path = await import('path');
    
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.default.resolve(process.cwd(), 'src'),
        },
      },
      plugins: [tailwindcss()],
    });
  },
};

export default config;