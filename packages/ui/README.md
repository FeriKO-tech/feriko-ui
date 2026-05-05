# @feriko/ui

Dark / cyberpunk / gaming React components. Ten primitives, four built-in themes, zero runtime dependencies.

## Install

```bash
pnpm add @feriko/ui
# or
npm install @feriko/ui
```

React 18+ is required as a peer dependency.

## Usage

```tsx
import {
  Badge,
  Button,
  Card,
  CardTitle,
  GlitchText,
  NeonBorder,
  ScanlineOverlay,
  TerminalBlock,
} from '@feriko/ui';

// Import once, anywhere in your app bundle:
import '@feriko/ui/styles.css';

export default function Panel() {
  return (
    <NeonBorder glow>
      <GlitchText as="h1" text="FERIKO" />
      <Card interactive>
        <CardTitle>Operator console</CardTitle>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge tone="accent" dot>online</Badge>
          <Button variant="neon" size="sm">Engage</Button>
        </div>
      </Card>

      <ScanlineOverlay>
        <TerminalBlock title="bash @ mainframe" prompt>
          {`pnpm add @feriko/ui
echo "jacked in"`}
        </TerminalBlock>
      </ScanlineOverlay>
    </NeonBorder>
  );
}
```

## Theming

Switch between the four bundled themes with a single data attribute:

```html
<html data-feriko-theme="cyberpunk">     <!-- default -->
<html data-feriko-theme="synthwave">
<html data-feriko-theme="tokyo-night">
<html data-feriko-theme="dark-fantasy">
```

Or scope a theme to any subtree:

```tsx
<section data-feriko-theme="dark-fantasy">
  <Button variant="neon">Enter dungeon</Button>
</section>
```

To override individual tokens, set CSS variables on your own selector:

```css
:root {
  --fui-accent: #00ffae;
  --fui-accent-glow: #66ffd1;
  --fui-neon-a: #00ffae;
  --fui-neon-b: #6aeaff;
}
```

Full token list: see [`variables.css`](./src/styles/variables.css).

## Components

### `Button`

```tsx
<Button variant="primary" size="md" leadingIcon={<Icon />}>Go</Button>
```

Variants: `primary` (default), `ghost`, `danger`, `neon`, `link`. Sizes: `sm`, `md`, `lg`. Renders a real `<button>` so it forwards refs and supports every native attribute.

### `Badge`

```tsx
<Badge tone="accent" dot>LIVE</Badge>
```

Tones: `default`, `accent`, `success`, `danger`, `warning`, `info`. The optional `dot` prop adds a pulsing coloured dot.

### `Card`

```tsx
<Card glow>
  <CardTitle>Title</CardTitle>
  <CardDescription>Dim body text.</CardDescription>
</Card>
```

Flags: `interactive` (hover lift + accent border), `glow` (permanent accent halo). Exports `CardTitle` and `CardDescription` helpers so you do not have to re-style headings.

### `Input` / `Textarea` / `Select`

All three share the same field ergonomics:

```tsx
<Input
  label="Handle"
  placeholder="neo@mainframe"
  hint="Pick something unique."
/>

<Input
  label="Cipher"
  type="password"
  error="Too short."
/>

<Select
  label="Region"
  options={[
    { value: 'eu', label: 'EU' },
    { value: 'us', label: 'US' },
  ]}
/>
```

Every field ships with `aria-invalid` wiring when `error` is set, plus a mono-spaced label and hint/error slot. IDs are auto-generated via `React.useId` if you do not pass one.

### `Modal`

```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm"
  description="This action is irreversible."
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={submit}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to disconnect?</p>
</Modal>
```

Portals to `document.body`, traps focus inside the panel, closes on Escape and backdrop click (toggle off via `disableEscapeClose` / `disableBackdropClose`). Renders nothing while `open === false`. Body scroll is locked while open.

### `Drawer`

```tsx
<Drawer open={open} side="right" onClose={() => setOpen(false)} title="Filters">
  ...
</Drawer>
```

Same ergonomics as `Modal` - portal, focus trap, Escape / backdrop dismiss - but slides in from a viewport edge. Sides: `left`, `right` (default), `top`, `bottom`.

### `Tooltip`

```tsx
<Tooltip content="Save changes" placement="top">
  <Button>Save</Button>
</Tooltip>
```

Hover + keyboard-focus tooltip powered by [`@floating-ui/react`](https://floating-ui.com/). 12 placements (`top`, `top-start`, `top-end`, `right`, ..., `left-end`), automatic flip / shift on overflow, soft arrow. Requires a single child that accepts refs (native DOM nodes and `forwardRef` components both work).

### `Popover`

```tsx
<Popover
  placement="bottom"
  content={
    <div>
      <Button variant="ghost" size="sm">Profile</Button>
      <Button variant="ghost" size="sm">Sign out</Button>
    </div>
  }
>
  <Button>Options</Button>
</Popover>
```

Click-triggered panel with floating-ui positioning, focus management (`FloatingFocusManager`) and outside-click / Escape dismissal. Can be controlled via `open` / `onOpenChange` or left uncontrolled. Hide the arrow with `hideArrow`.

### `GlitchText`

```tsx
<GlitchText as="h1" text="SYSTEM FAILURE" />
```

Polymorphic tag (`span` by default, any of `h1`-`h4`, `p`, `div`). Uses CSS pseudo-elements fed from a `data-text` attribute so there are no extra DOM nodes.

### `NeonBorder`

```tsx
<NeonBorder glow>...</NeonBorder>
```

Gradient outline (`--fui-neon-a` to `--fui-neon-b`) rendered with `mask-composite`. `glow` adds a soft halo on top.

### `TerminalBlock`

```tsx
<TerminalBlock title="bash @ mainframe" prompt>
  {`pnpm install
pnpm run dev`}
</TerminalBlock>
```

Mac-style title bar with three dots, optional `$ ` prefix, `white-space: pre` body. Pass any React children if you want syntax highlighting (drop in `react-syntax-highlighter` or shiki output).

### `ScanlineOverlay`

```tsx
<ScanlineOverlay>{/* anything */}</ScanlineOverlay>
```

Overlays drifting CRT scanlines. Clicks pass through (`pointer-events: none`). Add the `static` prop to disable animation.

## Utilities

### `cn`

```ts
import { cn } from '@feriko/ui';

cn('fui-btn', isPrimary && 'fui-btn--primary', className);
```

Thin wrapper around `clsx` - handy when you extend the library with your own variants.

## Development

This package lives in the [feriko-ui monorepo](https://github.com/FeriKO-tech/feriko-ui). See the top-level README for contributing instructions.

## License

MIT
