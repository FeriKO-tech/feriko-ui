---
"@feriko/ui": minor
---

Add overlay primitives: `Modal`, `Drawer`, `Tooltip`, `Popover`.

- `Modal` and `Drawer` render into a portal, trap focus, lock body scroll, and dismiss on Escape / backdrop click (both toggles are opt-out).
- `Drawer` accepts `side: 'left' | 'right' | 'top' | 'bottom'`.
- `Tooltip` and `Popover` use `@floating-ui/react` for positioning with 12 placements, automatic flip / shift, and built-in arrows.
- `Tooltip` triggers on hover + keyboard focus; `Popover` is click-triggered with focus management and outside-press dismiss.
- Exports new `useFocusTrap` hook that can be reused by downstream components.
