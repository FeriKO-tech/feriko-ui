import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, Tooltip } from '@feriko/ui';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: { control: 'number' },
  },
  args: {
    content: 'Jack into the grid',
    placement: 'top',
    delay: 120,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const OnButton: Story = {
  render: (args) => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button variant="neon">Connect</Button>
      </Tooltip>
    </div>
  ),
};

export const OnBadge: Story = {
  args: { content: 'Signal locked at 40dBm', placement: 'right' },
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Badge tone="info" dot>uplink</Badge>
      </Tooltip>
    </div>
  ),
};

export const Rich: Story = {
  args: {
    placement: 'bottom',
    content: (
      <div>
        <strong>Mainframe</strong>
        <div style={{ color: 'var(--fui-text-dim)' }}>neo@grid.local</div>
      </div>
    ),
  },
  render: (args) => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};
