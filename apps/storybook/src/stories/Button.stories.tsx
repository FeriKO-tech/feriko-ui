import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@feriko/ui';

const meta: Meta<typeof Button> = {
  title: 'Base/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost', 'danger', 'neon', 'link'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Enter the grid',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Danger: Story = { args: { variant: 'danger', children: 'Self-destruct' } };

export const Neon: Story = { args: { variant: 'neon', children: 'Jack in' } };

export const Link: Story = { args: { variant: 'link', children: 'Read the manifesto' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    leadingIcon: <span>→</span>,
    trailingIcon: <span>↗</span>,
    children: 'Deploy',
  },
};
