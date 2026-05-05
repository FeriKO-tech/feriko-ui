import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@feriko/ui';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Transmission',
    placeholder: 'Broadcast your message to the grid...',
    rows: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const WithHint: Story = {
  args: { hint: 'Max 4096 characters. Markdown not supported.' },
};
export const WithError: Story = {
  args: { error: 'Your message was flagged by the firewall.' },
};
