import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@feriko/ui';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Server region',
    options: [
      { value: 'eu', label: 'EU - Frankfurt' },
      { value: 'us', label: 'US - Ashburn' },
      { value: 'ap', label: 'AP - Tokyo' },
      { value: 'sa', label: 'SA - São Paulo', disabled: true },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Pick the closest region for the lowest ping.' },
};

export const WithError: Story = {
  args: { error: 'This region is currently offline.' },
};
