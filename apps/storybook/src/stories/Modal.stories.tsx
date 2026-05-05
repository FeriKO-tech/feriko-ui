import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Modal } from '@feriko/ui';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo: React.FC<{ title?: string; description?: string }> = ({
  title = 'Confirm jack-in',
  description = 'You are about to connect to the mainframe. This action is logged.',
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
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
          Focus is trapped inside the panel. Press Escape or click the backdrop to close.
        </p>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Sign in</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Operator login"
          description="Use your grid credentials."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Jack in</Button>
            </>
          }
        >
          <Input label="Handle" placeholder="neo@mainframe" />
          <Input label="Cipher" type="password" placeholder="••••••••" />
        </Modal>
      </div>
    );
  },
};
