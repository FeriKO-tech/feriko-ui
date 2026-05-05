import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const storybookDir = dirname(fileURLToPath(import.meta.url));
const uiSource = resolve(storybookDir, '../../../packages/ui/src/index.ts');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    const alias = config.resolve?.alias;

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: Array.isArray(alias)
          ? [...alias, { find: '@feriko/ui', replacement: uiSource }]
          : { ...alias, '@feriko/ui': uiSource },
      },
    };
  },
};

export default config;
