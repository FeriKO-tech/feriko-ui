# feriko-ui Figma kit spec

This spec describes a 1-to-1 Figma library for feriko-ui v0.1. Build it as a component library with tokenized styles from `design-tokens.json`.

## File structure

Create these pages:

- **Cover** - library overview, theme cards, version notes.
- **Foundations** - colors, typography, radius, shadows, motion.
- **Base components** - Button, Badge, Card, Input, Textarea, Select.
- **Overlays** - Modal, Drawer, Tooltip, Popover.
- **Data display** - Tabs, Accordion, Table, Pagination.
- **Specials** - GlitchText, NeonBorder, TerminalBlock, ScanlineOverlay.
- **Examples** - dashboard, login panel, settings drawer, command palette.

Use Figma variables for every token where possible. Use component properties for variants, size, state, and boolean features.

## Foundations

### Colors

Map tokens exactly:

- `bg`, `bg-soft`, `bg-panel`, `bg-raised`
- `border`, `border-strong`
- `text`, `text-dim`, `text-faint`
- `accent`, `accent-glow`, `accent-contrast`
- `success`, `danger`, `danger-glow`, `warning`, `info`
- `neon-a`, `neon-b`

Theme modes:

- cyberpunk
- synthwave
- tokyo-night
- dark-fantasy

### Typography

Use these text styles:

| Style | Font | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| Display | Inter | 48 | 800 | 56 | -2% |
| H1 | Inter | 36 | 800 | 44 | -1.5% |
| H2 | Inter | 28 | 700 | 36 | -1% |
| H3 | Inter | 20 | 700 | 28 | -0.5% |
| Body | Inter | 16 | 400 | 24 | 0 |
| Body small | Inter | 14 | 400 | 20 | 0 |
| Label | Inter | 13 | 600 | 18 | 0 |
| Mono | JetBrains Mono | 13 | 500 | 20 | 0 |
| Overline | JetBrains Mono | 11 | 700 | 16 | 16% |

### Effects

- Radius small: 6px.
- Radius medium: 10px.
- Radius large: 16px.
- Glow: `0 0 24px accent / 25%`.
- Glow strong: `0 0 32px accent / 45%`.
- Motion: 160ms, cubic-bezier(0.4, 0, 0.2, 1).

## Base components

### Button

Component: `Button`

Properties:

- `variant`: primary, ghost, danger, neon, link.
- `size`: sm, md, lg.
- `state`: default, hover, active, focus, disabled.
- `leadingIcon`: boolean.
- `trailingIcon`: boolean.

Sizing:

| Size | Height | Padding X | Radius | Text style |
| --- | --- | --- | --- | --- |
| sm | 32 | 12 | 6 | Body small |
| md | 40 | 16 | 10 | Body small, semibold |
| lg | 48 | 22 | 10 | Body |

Behavior details:

- Focus state uses a 2px accent ring plus 2px outside gap.
- Disabled state uses 50% opacity and no glow.
- Neon variant uses `neon-a` to `neon-b` gradient and strong glow.

### Badge

Component: `Badge`

Properties:

- `tone`: neutral, accent, success, warning, danger, info.
- `dot`: boolean.
- `pulse`: boolean.

Anatomy:

- Container: inline pill, 6px radius, 1px border.
- Text: Overline or Body small depending density.
- Dot: 6px circle before label. Pulse adds a soft halo layer.

### Card

Component: `Card`

Properties:

- `interactive`: boolean.
- `glow`: boolean.
- `state`: default, hover, focus.

Subcomponents:

- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

Layout:

- Container: `bg-panel`, 1px `border`, radius large, 20px padding.
- Glow adds `shadow-glow` and a subtle accent top border.
- Interactive hover raises background to `bg-raised` and strengthens border.

### Input, Textarea, Select

Components: `Input`, `Textarea`, `Select`

Properties:

- `state`: default, hover, focus, disabled, error.
- `label`: boolean.
- `hint`: boolean.
- `error`: boolean.

Shared anatomy:

- Label: Label text style, `text`.
- Control: 40px height for Input and Select, minimum 96px for Textarea.
- Border: `border`, focus `accent`, error `danger`.
- Hint: Body small, `text-faint`.
- Error text: Body small, `danger`.

## Overlays

### Modal

Component: `Modal`

Properties:

- `size`: sm, md, lg.
- `footer`: none, one action, two actions.
- `state`: open.

Anatomy:

- Backdrop: black at 64% opacity with blur.
- Panel: centered, `bg-raised`, radius large, 1px `border-strong`, `shadow-glow`.
- Header: title plus optional description.
- Content: freeform slot.
- Footer: right aligned actions.

Accessibility notes to document in component description:

- Role `dialog`.
- `aria-modal=true`.
- Escape and backdrop dismiss.
- Focus trap and focus restore.

### Drawer

Component: `Drawer`

Properties:

- `side`: left, right, top, bottom.
- `footer`: none, one action, two actions.
- `state`: open.

Layout:

- Left and right: width 420px, max 90vw.
- Top and bottom: height auto, max 80vh.
- Same header, content, footer anatomy as Modal.

### Tooltip

Component: `Tooltip`

Properties:

- `placement`: top, right, bottom, left.
- `arrow`: boolean.
- `state`: visible.

Layout:

- Background: `bg-raised`.
- Border: 1px `border-strong`.
- Radius: small.
- Padding: 8px 10px.
- Text: Body small.

### Popover

Component: `Popover`

Properties:

- `placement`: top, right, bottom, left.
- `state`: open.
- `width`: sm, md, lg.

Layout:

- Panel: `bg-raised`, radius medium, 1px border, glow.
- Padding: 12px.
- Content slot accepts buttons, inputs, text, or lists.

## Data display

### Tabs

Components:

- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

Properties:

- `orientation`: horizontal, vertical.
- `state` on trigger: default, hover, active, focus, disabled.

Layout:

- List: `bg-soft`, 4px padding, radius medium.
- Trigger: 36px height, 12px horizontal padding.
- Active indicator: `accent` fill with `shadow-glow`.
- Content: 16px top margin, `text-dim`.

### Accordion

Components:

- `Accordion`
- `AccordionItem`
- `AccordionTrigger`
- `AccordionContent`

Properties:

- `type`: single, multiple.
- `state` on item: open, closed.

Layout:

- Item: bottom border `border`.
- Trigger: 44px height, label left, chevron right.
- Content: 0 to auto height. Use Auto Layout frame for open variant.

### Table

Components:

- `Table`
- `TableHeader`
- `TableHead`
- `TableBody`
- `TableRow`
- `TableCell`
- `TableCaption`

Properties:

- `sortable` on head: boolean.
- `sortDirection`: none, ascending, descending.
- `selected` on row: boolean.
- `state` on row: default, hover, selected.

Layout:

- Header cells: Overline, `text-faint`, uppercase.
- Body cells: Body small, `text-dim`.
- Row height: 44px.
- Borders: bottom 1px `border`.

### Pagination

Component: `Pagination`

Properties:

- `page`: number text property.
- `state` on item: default, hover, active, disabled.
- `showControls`: boolean.
- `showBoundaries`: boolean.

Anatomy:

- Previous button.
- Number item.
- Ellipsis item.
- Next button.

## Specials

### GlitchText

Component: `GlitchText`

Properties:

- `level`: display, h1, h2, body.
- `intensity`: low, medium, high.

Figma approximation:

- Main text in `text`.
- Duplicate red/cyan layers behind it at x offsets -1px and 1px.
- Use `neon-a` and `neon-b` for split colors.

### NeonBorder

Component: `NeonBorder`

Properties:

- `glow`: boolean.
- `radius`: sm, md, lg.

Anatomy:

- Content container.
- Gradient border from `neon-a` to `neon-b`.
- Optional outer glow.

### TerminalBlock

Component: `TerminalBlock`

Properties:

- `prompt`: boolean.
- `lines`: 1, 2, 3, 4.

Anatomy:

- Window container with radius medium and 1px border.
- Header with three traffic-light dots.
- Body in Mono text style.
- Prompt prefix `$` when enabled.

### ScanlineOverlay

Component: `ScanlineOverlay`

Properties:

- `opacity`: low, medium, high.
- `static`: boolean.

Figma approximation:

- Transparent rectangle overlay.
- Repeating horizontal 1px lines at 4px spacing.
- Blend mode normal, opacity 20% to 45%.

## QA checklist

Before publishing the Figma library:

- Every component uses variables, not hardcoded theme colors.
- Each React prop with visual impact has a matching Figma component property.
- Every variant exists in all four theme modes.
- Keyboard and accessibility notes are documented in component descriptions.
- Names match React exports exactly.
- Components resize with Auto Layout and constraints.
- Example frames use only published components from the kit.
