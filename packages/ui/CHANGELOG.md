# @feriko/ui

## 0.2.0

### Minor Changes

- 52ec441: Add data-visual primitives: `Tabs`, `Accordion`, `Table`, `Pagination`.

  - `Tabs` - composable `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` with an animated indicator that slides between active triggers. Full keyboard navigation (Arrow / Home / End) plus controlled and uncontrolled modes and horizontal / vertical orientation.
  - `Accordion` - composable `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent` with `single` (collapsible) and `multiple` modes, ARIA `aria-expanded` / `aria-controls`, plus a `region`-labelled content panel.
  - `Table` - styled primitives `Table` / `TableCaption` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell`. `TableHead` exposes a `sortable` + `sortDirection` + `onSortToggle` API that wires up `aria-sort` and a chevron indicator while leaving sort state to the consumer.
  - `Pagination` - numbered pagination with configurable `siblingCount`, optional first/last boundaries, optional prev/next controls, and a `nav[aria-label]` wrapper.

- cdb1c0c: Initial public preview of feriko-ui.

  - Design-token system driven entirely by CSS variables (four built-in themes: cyberpunk, synthwave, tokyo-night, dark-fantasy).
  - Core components: Button, Badge, Card (with CardTitle / CardDescription).
  - Form primitives: Input, Textarea, Select - all with label / hint / error slots and aria-invalid wiring.
  - Signature specials: GlitchText, NeonBorder, TerminalBlock, ScanlineOverlay.
  - `cn` class-name helper exported for downstream variants.
  - Storybook 8 playground with live theme switcher.

- 7d58b4d: Add overlay primitives: `Modal`, `Drawer`, `Tooltip`, `Popover`.

  - `Modal` and `Drawer` render into a portal, trap focus, lock body scroll, and dismiss on Escape / backdrop click (both toggles are opt-out).
  - `Drawer` accepts `side: 'left' | 'right' | 'top' | 'bottom'`.
  - `Tooltip` and `Popover` use `@floating-ui/react` for positioning with 12 placements, automatic flip / shift, and built-in arrows.
  - `Tooltip` triggers on hover + keyboard focus; `Popover` is click-triggered with focus management and outside-press dismiss.
  - Exports new `useFocusTrap` hook that can be reused by downstream components.

### Patch Changes

- 497653b: Preserve the React Server Components client boundary in built package output so Next.js apps can import `@feriko/ui` safely from MDX and app-router pages.

  Also adds the private Next.js docs app and source-controlled Figma kit artifacts to the monorepo.
