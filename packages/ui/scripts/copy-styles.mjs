// Concatenates all source CSS into dist/styles.css for consumers that do
// `import '@feriko/ui/styles.css'`. Runs after tsup build.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const sources = [
  resolve(root, 'src/styles/variables.css'),
  resolve(root, 'src/styles/components.css'),
];

const distDir = resolve(root, 'dist');
mkdirSync(distDir, { recursive: true });

const banner = '/* @feriko/ui - bundled styles. Import once at your app root. */\n';
const body = sources.map((p) => readFileSync(p, 'utf8')).join('\n\n');

writeFileSync(resolve(distDir, 'styles.css'), banner + body);
for (const file of ['index.js', 'index.mjs']) {
  const path = resolve(distDir, file);
  const current = readFileSync(path, 'utf8');
  if (!current.startsWith("'use client';")) {
    writeFileSync(path, `'use client';\n${current}`);
  }
}
console.log('  ✓ dist/styles.css');
