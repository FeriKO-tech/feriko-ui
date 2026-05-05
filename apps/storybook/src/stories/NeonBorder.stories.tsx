import type { Meta, StoryObj } from '@storybook/react';
import { Badge, NeonBorder } from '@feriko/ui';

const meta: Meta<typeof NeonBorder> = {
  title: 'Special/NeonBorder',
  component: NeonBorder,
  tags: ['autodocs'],
  argTypes: {
    glow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof NeonBorder>;

export const Default: Story = {
  render: (args) => (
    <NeonBorder {...args} style={{ maxWidth: 360 }}>
      <h3 style={{ margin: 0, marginBottom: 8 }}>ACCESS POINT</h3>
      <p style={{ margin: 0, color: 'var(--fui-text-dim)' }}>
        Gradient pink-to-cyan outline rendered via masked pseudo-element. No extra DOM nodes.
      </p>
    </NeonBorder>
  ),
};

export const Glowing: Story = {
  args: { glow: true },
  render: (args) => (
    <NeonBorder {...args} style={{ maxWidth: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>SIGNAL LOCK</h3>
        <Badge tone="info" dot>live</Badge>
      </div>
      <p style={{ margin: '8px 0 0', color: 'var(--fui-text-dim)' }}>
        The `glow` prop adds a soft halo on top of the outline.
      </p>
    </NeonBorder>
  ),
};
