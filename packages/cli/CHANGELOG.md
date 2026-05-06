# feriko-ui

## 0.2.0

### Minor Changes

- c90e09f: Initial release of the `feriko-ui` CLI.

  - `npx feriko-ui init` scaffolds `feriko.config.json` and emits `feriko-variables.css` / `feriko-components.css` into the configured styles directory.
  - `npx feriko-ui add <name...>` copies component source (plus any hook / util dependencies) directly into the user's project, shadcn-style. Resolves a dep graph, asks before overwriting, supports `--overwrite` and `--all`.
  - `npx feriko-ui list` prints every component, hook, and util available in the bundled registry.
  - Registry is built at publish time by `scripts/build-registry.mjs` reading `packages/ui/src/` so CLI output always matches the library.
