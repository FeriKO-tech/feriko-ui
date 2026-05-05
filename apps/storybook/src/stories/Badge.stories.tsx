import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@feriko/ui';

const meta: Meta<typeof Badge> = {
  title: 'Base/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['default', 'accent', 'success', 'danger', 'warning', 'info'] },
    dot: { control: 'boolean' },
  },
  args: {
    children: 'online',
    tone: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Accent: Story = { args: { tone: 'accent', children: 'new', dot: true } };
export const Success: Story = { args: { tone: 'success', children: 'ready', dot: true } };
export const Danger: Story = { args: { tone: 'danger', children: 'critical', dot: true } };
export const Warning: Story = { args: { tone: 'warning', children: 'unstable' } };
export const Info: Story = { args: { tone: 'info', children: 'beta' } };

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge>default</Badge>
      <Badge tone="accent" dot>accent</Badge>
      <Badge tone="success" dot>success</Badge>
      <Badge tone="danger" dot>danger</Badge>
      <Badge tone="warning" dot>warning</Badge>
      <Badge tone="info" dot>info</Badge>
    </div>
  ),
};
