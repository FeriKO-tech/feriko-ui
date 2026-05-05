import { createElement } from 'react';
import type { Preview } from '@storybook/react';
import '../../../packages/ui/src/styles/variables.css';
import '../../../packages/ui/src/styles/components.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'cyberpunk',
      values: [
        { name: 'cyberpunk', value: '#0a0a14' },
        { name: 'synthwave', value: '#14011f' },
        { name: 'tokyo-night', value: '#1a1b26' },
        { name: 'dark-fantasy', value: '#0d0806' },
        { name: 'light', value: '#f8fafc' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'feriko-ui theme',
      defaultValue: 'cyberpunk',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'cyberpunk', title: 'Cyberpunk' },
          { value: 'synthwave', title: 'Synthwave' },
          { value: 'tokyo-night', title: 'Tokyo Night' },
          { value: 'dark-fantasy', title: 'Dark Fantasy' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'cyberpunk';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-feriko-theme', theme);
      }
      return createElement(Story);
    },
  ],
};

export default preview;
