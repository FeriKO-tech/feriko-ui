# feriko-ui (CLI)

Add feriko-ui components straight into your codebase - no `@feriko/ui` runtime dependency required. Inspired by the ergonomics of [`shadcn/ui`](https://ui.shadcn.com/)'s CLI.

## Quick start

```bash
# 1. scaffold config + base CSS (interactive)
npx feriko-ui init

# or accept all defaults
npx feriko-ui init --yes

# 2. add components (pulls dependencies automatically)
npx feriko-ui add button card modal

# 3. see what's available
npx feriko-ui list
```

## What `init` does

- Writes `feriko.config.json` at the project root.
- Emits `src/styles/feriko-variables.css` (design tokens + selected themes) and `src/styles/feriko-components.css` (styles required by the copied components).
- You then import both stylesheets once in your app entry.

## What `add <name>` does

- Resolves the dependency graph (e.g. `modal` depends on `use-focus-trap` and `cn`) and copies every file to the configured target directory.
- If a file already exists it asks before overwriting, unless you pass `--overwrite`.
- Code is emitted verbatim from the library - no transformation, no magic imports.

### Available targets

Run `feriko-ui list` to get the live list. Current registry:

**Components:** `button`, `badge`, `card`, `input`, `textarea`, `select`, `modal`, `drawer`, `tooltip`, `popover`, `tabs`, `accordion`, `table`, `pagination`, `glitch-text`, `neon-border`, `terminal-block`, `scanline-overlay`.
**Hooks:** `use-focus-trap`.
**Utils:** `cn`.

## Configuration

`feriko.config.json`:

```json
{
  "componentsDir": "src/components/ui",
  "hooksDir": "src/hooks",
  "utilsDir": "src/lib",
  "stylesDir": "src/styles",
  "alias": "@/components/ui",
  "themes": ["cyberpunk", "synthwave", "tokyo-night", "dark-fantasy"]
}
```

Edit the paths if your project lays things out differently.

## Compared to `@feriko/ui`

| | `npm i @feriko/ui` | `npx feriko-ui add` |
| --- | --- | --- |
| How you get the code | Runtime import from the package | Source files copied into your repo |
| Upgrades | Bump the version | Re-run `add --overwrite` |
| Customisation | Fork or wrap | Edit the component directly |
| Tree-shaking | Automatic | You only have what you added |

Pick the CLI if you want direct control of the source. Pick the npm package if you want patch-level updates without touching your repo.

## License

MIT © FeriKO-tech
