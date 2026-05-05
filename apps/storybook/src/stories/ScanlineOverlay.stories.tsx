import type { Meta, StoryObj } from '@storybook/react';
import { GlitchText, ScanlineOverlay } from '@feriko/ui';

const meta: Meta<typeof ScanlineOverlay> = {
  title: 'Special/ScanlineOverlay',
  component: ScanlineOverlay,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScanlineOverlay>;

export const Default: Story = {
  render: () => (
    <ScanlineOverlay style={{ padding: 40, background: 'var(--fui-bg-raised)', borderRadius: 12 }}>
      <GlitchText as="h1" text="CRT SIGNAL" style={{ fontSize: 48, margin: 0 }} />
      <p style={{ color: 'var(--fui-text-dim)', marginTop: 12 }}>
        Animated horizontal scanlines drift over any content. Clicks pass through.
      </p>
    </ScanlineOverlay>
  ),
};

export const Static: Story = {
  render: () => (
    <ScanlineOverlay
      static
      style={{ padding: 40, background: 'var(--fui-bg-raised)', borderRadius: 12 }}
    >
      <h2 style={{ margin: 0 }}>No animation</h2>
      <p style={{ color: 'var(--fui-text-dim)' }}>
        Same pattern without the drift motion.
      </p>
    </ScanlineOverlay>
  ),
};
