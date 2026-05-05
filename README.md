# feriko-ui

Dark, cyberpunk, gaming React component library. Zero-dependency runtime (just React and a tiny CSS file), designed to drop into Next.js, Vite, Remix or plain CRA apps.

> Status: `v0.1.0` - initial public preview. APIs may still shift a little before `v1`.

![license](https://img.shields.io/badge/license-MIT-9d7bff)
![react](https://img.shields.io/badge/react-%3E%3D18.0.0-4cf2ff)
![pnpm](https://img.shields.io/badge/pnpm-workspace-ff3ccf)

## What is this

feriko-ui is a small set of React primitives shaped around a specific aesthetic - think "game launcher HUD meets cyberpunk terminal". It gives you:

- Themed design tokens driven entirely by CSS custom properties.
- Four built-in themes: `cyberpunk`, `synthwave`, `tokyo-night`, `dark-fantasy`.
- Eighteen components across base, overlay, and data-visual primitives - see the table below.
- Storybook 8 playground with a live theme switcher.
- A shadcn-style CLI that copies component source into consumer projects.
- A Next.js 15 + MDX docs app and source-controlled Figma kit spec.

There is no Tailwind requirement, no CSS-in-JS runtime, no opinion about your router. Drop the stylesheet in once, import components, ship.

## Monorepo layout

```
feriko-ui/
  packages/
    ui/                  # @feriko/ui - the published npm package
    cli/                 # feriko-ui - npx CLI for copying components
  apps/
    storybook/           # Storybook 8 documentation app (private)
    docs/                # Next.js 15 + MDX docs app (private)
  figma/                 # Tokens + Figma component build spec
  .changeset/            # Release notes + version bumps (changesets)
```

## Quick start (consumer)

```bash
pnpm add @feriko/ui
# or: npm install @feriko/ui
# or: yarn add @feriko/ui
```

```tsx
import { Button, Card, CardTitle, GlitchText } from '@feriko/ui';
import '@feriko/ui/styles.css';

export default function Demo() {
  return (
    <Card glow>
      <GlitchText as="h2" text="JACK IN" />
      <CardTitle>Welcome to the grid</CardTitle>
      <Button variant="neon">Connect</Button>
    </Card>
  );
}
```

Switch themes by toggling a data attribute anywhere above your components:

```html
<html data-feriko-theme="synthwave">
```

Supported values: `cyberpunk` (default), `synthwave`, `tokyo-night`, `dark-fantasy`. You can also override any `--fui-*` variable yourself.

## CLI quick start

If you want to own the source instead of importing from npm, use the CLI:

```bash
npx feriko-ui init
npx feriko-ui add button card modal
npx feriko-ui list
```

`init` writes `feriko.config.json` and emits `feriko-variables.css` plus `feriko-components.css`. `add` copies components, hooks, and utils into the configured folders, resolving dependencies automatically.

## Quick start (contributor)

```bash
pnpm install
pnpm dev              # Storybook on http://localhost:6006
pnpm dev:docs         # Next.js docs on http://localhost:3030
pnpm build            # Build the @feriko/ui package (dist/)
pnpm build:cli        # Build the feriko-ui CLI package (dist/)
pnpm build:docs       # Build the Next.js docs app
pnpm build:storybook  # Static Storybook in apps/storybook/storybook-static/
pnpm typecheck        # TypeScript across all workspaces
```

> Heads-up: the `pnpm build:storybook` command uses Vite, which currently fails to build when the project path contains a `#` character (Vite [#14289](https://github.com/vitejs/vite/issues/14289)). `pnpm dev` and the library build (`pnpm build`) are unaffected, and CI runs in a clean path.
> Heads-up: `pnpm build:docs` includes a local workaround for the same Windows `#` path class by building from a temporary copy when needed.

### Adding a changeset

Before opening a PR that changes the public API, run:

```bash
pnpm changeset
```

Select `@feriko/ui`, pick a bump level (patch/minor/major) and write a summary. Commit the generated file in `.changeset/`.

### Releasing

`pnpm release` runs the build then `changeset publish`. CI handles this automatically on pushes to `master` via the Changesets GitHub Action once `NPM_TOKEN` is configured as a repo secret.

## Design tokens

All components read from `--fui-*` CSS variables declared in `packages/ui/src/styles/variables.css`. Override any of them on `:root` or a scoped wrapper to retheme without forking the library.

Key variables:

- `--fui-bg`, `--fui-bg-soft`, `--fui-bg-raised` - surfaces
- `--fui-text`, `--fui-text-dim`, `--fui-text-faint` - typography
- `--fui-accent`, `--fui-accent-glow`, `--fui-accent-contrast` - primary accent
- `--fui-neon-a`, `--fui-neon-b` - gradient duo used by `NeonBorder` and `GlitchText`
- `--fui-radius-sm`, `--fui-radius`, `--fui-radius-lg` - corner radii
- `--fui-shadow-glow`, `--fui-shadow-glow-strong` - halo shadows

## Figma kit

The `figma/` directory contains text-first source for a 1-to-1 Figma library:

- `design-tokens.json` - W3C Design Tokens format for Tokens Studio or Style Dictionary.
- `tokens.css` - CSS custom property reference matching `packages/ui/src/styles/variables.css`.
- `spec.md` - page-by-page component spec for recreating the Figma file.
- `README.md` - setup and update workflow.

A native `.fig` binary is not committed because Figma does not provide a stable writeable file format. The tracked token/spec files are the source of truth.

## Component reference

See the Storybook playground for interactive examples. A quick index:

| Component         | What it does                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| `Button`          | 5 variants (primary, ghost, danger, neon, link), 3 sizes, icon slots      |
| `Badge`           | Pill / chip with 5 tone variants and optional pulsing dot                 |
| `Card`            | Container with `interactive` and `glow` flags, plus Title / Description   |
| `Input`           | Labelled text input with hint / error slots and `aria-invalid` wiring     |
| `Textarea`        | Same ergonomics as Input, monospaced                                      |
| `Select`          | Native `<select>` with options prop and shared field styling              |
| `Modal`           | Portal + focus trap + Escape, with title / description / footer slots     |
| `Drawer`          | Side-panel variant of Modal (`left`, `right`, `top`, `bottom`)            |
| `Tooltip`         | Hover / focus tooltip via floating-ui with 12 placements and arrow        |
| `Popover`         | Click-triggered floating panel via floating-ui, focus-managed             |
| `Tabs`            | `tablist` with animated indicator, arrow / Home / End keyboard nav        |
| `Accordion`       | Single or multi-open collapsible sections, fully keyboard-accessible      |
| `Table`           | Styled table primitives + sortable `TableHead` with `aria-sort` wiring    |
| `Pagination`      | Numbered pages with ellipsis, configurable siblings and boundary pages    |
| `GlitchText`      | Polymorphic heading / span with RGB-split glitch animation                |
| `NeonBorder`      | Gradient outline wrapper with optional halo                               |
| `TerminalBlock`   | Mac-style terminal window, optional `$ ` prompt prefix                    |
| `ScanlineOverlay` | CRT scanline overlay that drifts vertically (toggle off with `static`)    |

## Browser support

Everything is vanilla CSS + React 18. No build-time requirements beyond what your app already uses. We use `mask-composite` for `NeonBorder`, which is supported in all evergreen browsers (Chrome 120+, Safari 15.4+, Firefox 53+).

## License

MIT - see [LICENSE](./LICENSE).
