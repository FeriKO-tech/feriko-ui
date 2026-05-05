---
"@feriko/ui": minor
---

Add data-visual primitives: `Tabs`, `Accordion`, `Table`, `Pagination`.

- `Tabs` - composable `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` with an animated indicator that slides between active triggers. Full keyboard navigation (Arrow / Home / End) plus controlled and uncontrolled modes and horizontal / vertical orientation.
- `Accordion` - composable `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent` with `single` (collapsible) and `multiple` modes, ARIA `aria-expanded` / `aria-controls`, plus a `region`-labelled content panel.
- `Table` - styled primitives `Table` / `TableCaption` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell`. `TableHead` exposes a `sortable` + `sortDirection` + `onSortToggle` API that wires up `aria-sort` and a chevron indicator while leaving sort state to the consumer.
- `Pagination` - numbered pagination with configurable `siblingCount`, optional first/last boundaries, optional prev/next controls, and a `nav[aria-label]` wrapper.
