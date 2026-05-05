# feriko-ui Figma kit

This directory holds everything needed to recreate feriko-ui inside Figma at parity with the React library.

A native `.fig` file cannot be generated programmatically (Figma's binary format is closed and only writeable from the Figma application or its plugin API). What you get instead:

- **`design-tokens.json`** - W3C Design Tokens Community Group format. Imports cleanly into [Tokens Studio for Figma](https://tokens.studio/), [Style Dictionary](https://styledictionary.com/), or any other tool that speaks the spec.
- **`spec.md`** - frame-by-frame component spec. Use it as a checklist when building the kit in Figma.
- **`tokens.css`** - the same tokens as plain CSS custom properties so designers can paste them into any browser dev-tools to compare side by side.

## How to assemble the Figma kit

1. Create a new Figma file: `feriko-ui v0.1`.
2. Install the **Tokens Studio for Figma** plugin.
3. In Tokens Studio, choose `Tools → Load from JSON` and pick `figma/design-tokens.json`. Apply the `cyberpunk` set first - the others are theme overrides.
4. Walk through `figma/spec.md` top to bottom. Each section maps 1-to-1 to a component in `@feriko/ui` and describes the variants, sizes, and states that ship.
5. Publish the file as a Figma library when every section is done.

Cross-check against the live components in [Storybook](https://feriko-ui.dev) (or the local Storybook served from `apps/storybook`) - they use the exact same token values.

## Updating the kit

When the React library gains a component or token:

1. Update the relevant section of `spec.md`.
2. Add or rename tokens in `design-tokens.json`. Keep the structure flat under `colors`, `typography`, `radii`, `shadows`, `spacing`, `motion` so Tokens Studio reads them cleanly.
3. Re-export `tokens.css` from your editor (the values must match `packages/ui/src/styles/variables.css`).
4. Bump the kit's Figma version (file menu → Version history) and publish.
