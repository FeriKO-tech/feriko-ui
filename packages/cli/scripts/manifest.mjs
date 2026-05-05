/**
 * Manifest of every entry the CLI can install.
 * `deps` references other entries in this manifest.
 * Files are read relative to `packages/ui/src/`.
 */
export const MANIFEST = {
  cn: {
    kind: 'util',
    files: ['utils/cn.ts'],
    description: 'classNames helper (clsx wrapper).',
  },
  'use-focus-trap': {
    kind: 'hook',
    files: ['hooks/useFocusTrap.ts'],
    description: 'Trap focus inside a container while a modal/drawer is open.',
  },
  button: {
    kind: 'component',
    files: ['components/Button.tsx'],
    deps: ['cn'],
    description: 'Pressable button with 5 variants and 3 sizes.',
  },
  badge: {
    kind: 'component',
    files: ['components/Badge.tsx'],
    deps: ['cn'],
    description: 'Inline status pill with optional pulsing dot.',
  },
  card: {
    kind: 'component',
    files: ['components/Card.tsx'],
    deps: ['cn'],
    description: 'Container with interactive and glow flags.',
  },
  input: {
    kind: 'component',
    files: ['components/Input.tsx'],
    deps: ['cn'],
    description: 'Labelled text input with hint / error slots.',
  },
  textarea: {
    kind: 'component',
    files: ['components/Textarea.tsx'],
    deps: ['cn'],
    description: 'Multi-line input with the same ergonomics as Input.',
  },
  select: {
    kind: 'component',
    files: ['components/Select.tsx'],
    deps: ['cn'],
    description: 'Native select with shared field styling.',
  },
  modal: {
    kind: 'component',
    files: ['components/Modal.tsx'],
    deps: ['cn', 'use-focus-trap'],
    description: 'Modal dialog with portal, focus trap, and Escape dismiss.',
  },
  drawer: {
    kind: 'component',
    files: ['components/Drawer.tsx'],
    deps: ['cn', 'use-focus-trap'],
    description: 'Side-panel variant of Modal with directional slide-in.',
  },
  tooltip: {
    kind: 'component',
    files: ['components/Tooltip.tsx'],
    deps: ['cn'],
    description: 'Floating-ui tooltip with hover + focus triggers.',
  },
  popover: {
    kind: 'component',
    files: ['components/Popover.tsx'],
    deps: ['cn', 'tooltip'],
    description: 'Click-triggered floating panel with focus management.',
  },
  tabs: {
    kind: 'component',
    files: ['components/Tabs.tsx'],
    deps: ['cn'],
    description: 'Composable tabs with animated indicator and arrow-key nav.',
  },
  accordion: {
    kind: 'component',
    files: ['components/Accordion.tsx'],
    deps: ['cn'],
    description: 'Collapsible sections in single or multiple modes.',
  },
  table: {
    kind: 'component',
    files: ['components/Table.tsx'],
    deps: ['cn'],
    description: 'Styled table primitives with sortable header helper.',
  },
  pagination: {
    kind: 'component',
    files: ['components/Pagination.tsx'],
    deps: ['cn'],
    description: 'Numbered pagination with ellipsis and configurable boundaries.',
  },
  'glitch-text': {
    kind: 'component',
    files: ['components/GlitchText.tsx'],
    deps: ['cn'],
    description: 'Polymorphic text with RGB-split glitch animation.',
  },
  'neon-border': {
    kind: 'component',
    files: ['components/NeonBorder.tsx'],
    deps: ['cn'],
    description: 'Wrapper with gradient neon outline and optional glow.',
  },
  'terminal-block': {
    kind: 'component',
    files: ['components/TerminalBlock.tsx'],
    deps: ['cn'],
    description: 'Mac-style terminal window with optional $ prompt.',
  },
  'scanline-overlay': {
    kind: 'component',
    files: ['components/ScanlineOverlay.tsx'],
    deps: ['cn'],
    description: 'CRT scanline overlay that drifts vertically.',
  },
};

export const STYLES = {
  variables: {
    file: 'styles/variables.css',
    description: 'Design tokens + four bundled themes.',
  },
  components: {
    file: 'styles/components.css',
    description: 'Component CSS. Required if you copy components verbatim.',
  },
};
