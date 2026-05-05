import type { Meta, StoryObj } from '@storybook/react';
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  GlitchText,
  Input,
  NeonBorder,
  ScanlineOverlay,
  Select,
  TerminalBlock,
} from '@feriko/ui';

const meta: Meta = {
  title: 'Overview/Showcase',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const LandingPage: Story = {
  render: () => (
    <div style={{ padding: 40, display: 'grid', gap: 32, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <GlitchText as="h1" text="FERIKO // UI" style={{ fontSize: 56, margin: 0 }} />
        <div style={{ display: 'flex', gap: 12 }}>
          <Badge tone="accent" dot>v0.1</Badge>
          <Badge tone="info">docs</Badge>
        </div>
      </header>

      <ScanlineOverlay
        style={{ padding: 24, borderRadius: 12, background: 'var(--fui-bg-soft)' }}
      >
        <p style={{ color: 'var(--fui-text-dim)', margin: 0, maxWidth: 640 }}>
          Dark cyberpunk React components that scratch the same itch as shadcn/ui but with neon,
          glitch and scanlines baked in. Ship a hero section, a signup form or a game HUD without
          writing CSS from scratch.
        </p>
      </ScanlineOverlay>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <Card interactive>
          <CardTitle>Themes out of the box</CardTitle>
          <CardDescription>
            Cyberpunk, Synthwave, Tokyo Night, Dark Fantasy. Swap with one data attribute.
          </CardDescription>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <Badge>cyberpunk</Badge>
            <Badge tone="accent">synthwave</Badge>
            <Badge tone="info">tokyo-night</Badge>
          </div>
        </Card>

        <Card glow>
          <CardTitle>Accessible primitives</CardTitle>
          <CardDescription>
            Every form field ships with labels, error messages and `aria-invalid` plumbing.
          </CardDescription>
          <Input label="Handle" placeholder="neo@mainframe" />
        </Card>

        <NeonBorder glow>
          <CardTitle style={{ marginBottom: 6 }}>Signature specials</CardTitle>
          <CardDescription>
            GlitchText, NeonBorder, TerminalBlock, ScanlineOverlay - the fun stuff.
          </CardDescription>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button variant="neon" size="sm">Try it</Button>
            <Button variant="ghost" size="sm">Docs</Button>
          </div>
        </NeonBorder>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <CardTitle>Signup</CardTitle>
          <Input label="Handle" placeholder="neo@mainframe" />
          <Input label="Cipher" type="password" placeholder="••••••••" />
          <Select
            label="Region"
            options={[
              { value: 'eu', label: 'EU - Frankfurt' },
              { value: 'us', label: 'US - Ashburn' },
              { value: 'ap', label: 'AP - Tokyo' },
            ]}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <Button>Create account</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </Card>

        <TerminalBlock title="bash @ mainframe" prompt>
          {`pnpm add @feriko/ui
echo "import { Button } from '@feriko/ui'"
echo "import '@feriko/ui/styles.css'"`}
        </TerminalBlock>
      </section>
    </div>
  ),
};
