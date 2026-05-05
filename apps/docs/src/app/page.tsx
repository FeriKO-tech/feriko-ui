import Link from 'next/link';
import {
  Badge,
  Button,
  Card,
  GlitchText,
  NeonBorder,
  ScanlineOverlay,
  TerminalBlock,
} from '@feriko/ui';

export default function HomePage() {
  return (
    <>
      <NeonBorder
        glow
        style={{
          padding: 40,
          marginBottom: 40,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ScanlineOverlay />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Badge tone="accent" dot>v0.1</Badge>
          <h1 style={{ marginTop: 12, marginBottom: 8 }}>
            <GlitchText as="span" text="feriko-ui" />
          </h1>
          <p style={{ fontSize: 18, marginBottom: 20 }}>
            React components for projects that want to look like a game launcher,
            not a Stripe dashboard.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/docs/install" style={{ textDecoration: 'none' }}>
              <Button variant="primary">Get started</Button>
            </Link>
            <Link href="/docs/components/button" style={{ textDecoration: 'none' }}>
              <Button variant="ghost">Browse components</Button>
            </Link>
            <a
              href="https://github.com/FeriKO-tech/feriko-ui"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="link">GitHub →</Button>
            </a>
          </div>
        </div>
      </NeonBorder>

      <h2>Two ways to install</h2>
      <p>Pick the path that fits how you like to ship.</p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: 16 }}>
        <Card glow>
          <h3 style={{ margin: '0 0 8px' }}>npm package</h3>
          <p style={{ margin: '0 0 12px' }}>
            Tree-shakable ESM/CJS. Patch upgrades via semver. Zero source in your repo.
          </p>
          <TerminalBlock prompt>{`pnpm add @feriko/ui`}</TerminalBlock>
        </Card>
        <Card glow>
          <h3 style={{ margin: '0 0 8px' }}>CLI (shadcn-style)</h3>
          <p style={{ margin: '0 0 12px' }}>
            Copy the source straight into your project. Edit anything, own the code.
          </p>
          <TerminalBlock prompt>{`npx feriko-ui init
npx feriko-ui add button`}</TerminalBlock>
        </Card>
      </div>

      <h2>What ships in v0.1</h2>
      <ul>
        <li><strong>18 components</strong> across base, overlay, data, and special primitives.</li>
        <li><strong>4 themes</strong>: cyberpunk, synthwave, tokyo-night, dark-fantasy. Switch any time via <code>data-feriko-theme</code>.</li>
        <li><strong>Accessibility-first:</strong> focus traps on overlays, full keyboard nav on tabs / accordion, <code>aria-sort</code> on sortable tables.</li>
        <li><strong>Zero CSS-in-JS runtime.</strong> Just one stylesheet plus components.</li>
      </ul>

      <hr />

      <p style={{ color: 'var(--fui-text-faint)', fontSize: 13 }}>
        Use the theme switcher in the sidebar to preview every doc page in another mood.
      </p>
    </>
  );
}
