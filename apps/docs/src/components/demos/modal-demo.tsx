'use client';

import * as React from 'react';
import { Button, Drawer, Modal, type DrawerSide } from '@feriko/ui';

export function ModalDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm jack-in"
        description="You're about to connect to the mainframe. This action is logged."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p style={{ color: 'var(--fui-text-dim)', margin: 0 }}>
          Focus is trapped in the panel. Press Escape or click the backdrop.
        </p>
      </Modal>
    </>
  );
}

export function DrawerDemo({ side = 'right' as DrawerSide }: { side?: DrawerSide }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {side} drawer</Button>
      <Drawer
        open={open}
        side={side}
        onClose={() => setOpen(false)}
        title={`Panel (${side})`}
        description="Same a11y guarantees as Modal, but slides in from a viewport edge."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </>
        }
      >
        <p style={{ color: 'var(--fui-text-dim)', margin: 0 }}>
          Great for filters, settings, or mobile nav.
        </p>
      </Drawer>
    </>
  );
}
