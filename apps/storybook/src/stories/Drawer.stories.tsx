import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, Drawer, type DrawerSide } from '@feriko/ui';

const meta: Meta<typeof Drawer> = {
  title: 'Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerDemo: React.FC<{ side: DrawerSide }> = ({ side }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open {side} drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        title={`System panel (${side})`}
        description="Slide-in panel. Focus trapped, Escape dismisses."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Badge tone="accent" dot>online</Badge>
          <p style={{ color: 'var(--fui-text-dim)', margin: 0 }}>
            Great for settings, filters, or a mobile nav. Scrollable when content overflows.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export const Right: Story = { render: () => <DrawerDemo side="right" /> };
export const Left: Story = { render: () => <DrawerDemo side="left" /> };
export const Top: Story = { render: () => <DrawerDemo side="top" /> };
export const Bottom: Story = { render: () => <DrawerDemo side="bottom" /> };
