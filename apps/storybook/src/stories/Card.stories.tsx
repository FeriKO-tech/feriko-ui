import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, Card, CardDescription, CardTitle } from '@feriko/ui';

const meta: Meta<typeof Card> = {
  title: 'Base/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    interactive: { control: 'boolean' },
    glow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardTitle>Operator console</CardTitle>
      <CardDescription>Access the mainframe. Bring your own credentials.</CardDescription>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button size="sm">Connect</Button>
        <Button size="sm" variant="ghost">Details</Button>
      </div>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: Default.render,
};

export const Glowing: Story = {
  args: { glow: true },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <CardTitle>Featured drop</CardTitle>
        <Badge tone="accent" dot>new</Badge>
      </div>
      <CardDescription>
        Always-on accent glow. Use for promoted items, featured scenes, or active sessions.
      </CardDescription>
    </Card>
  ),
};
