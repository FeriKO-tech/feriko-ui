import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@feriko/ui';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Operator handle',
    placeholder: 'neo@mainframe',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Pick something unique. No real names.' },
};

export const WithError: Story = {
  args: { error: 'This handle is already jacked in.' },
};

export const Password: Story = {
  args: { label: 'Cipher', type: 'password', placeholder: '••••••••' },
};
