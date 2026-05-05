import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, Popover } from '@feriko/ui';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
  args: {
    placement: 'bottom',
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Menu: Story = {
  args: {
    content: (
      <div style={{ display: 'grid', gap: 6 }}>
        <Button variant="ghost" size="sm">Profile</Button>
        <Button variant="ghost" size="sm">Settings</Button>
        <Button variant="ghost" size="sm">Sign out</Button>
      </div>
    ),
  },
  render: (args) => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Popover {...args}>
        <Button>Options</Button>
      </Popover>
    </div>
  ),
};

export const Info: Story = {
  args: {
    placement: 'right',
    content: (
      <div>
        <strong style={{ display: 'block', marginBottom: 4 }}>Uptime</strong>
        <Badge tone="success" dot>99.98%</Badge>
        <p style={{ color: 'var(--fui-text-dim)', margin: '8px 0 0', fontSize: 13 }}>
          Last incident: 42 days ago. Click outside or press Escape to dismiss.
        </p>
      </div>
    ),
  },
  render: (args) => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Popover {...args}>
        <Button variant="ghost">Status</Button>
      </Popover>
    </div>
  ),
};
