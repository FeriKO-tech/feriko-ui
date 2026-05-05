// Generates packages/cli/src/registry/components.json by reading the @feriko/ui
// source tree. The CLI bundles this JSON at build time; consumers fetch nothing
// from the network when they run `feriko-ui add <component>`.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MANIFEST, STYLES } from './manifest.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', 'ui', 'src');
const OUT = join(__dirname, '..', 'src', 'registry', 'components.json');

function readSource(file) {
  return readFileSync(join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');
}

const entries = Object.fromEntries(
  Object.entries(MANIFEST).map(([key, def]) => [
    key,
    {
      ...def,
      contents: def.files.map((path) => ({ path, source: readSource(path) })),
    },
  ]),
);

const styles = Object.fromEntries(
  Object.entries(STYLES).map(([key, def]) => [
    key,
    {
      file: def.file,
      description: def.description,
      source: readSource(def.file),
    },
  ]),
);

const registry = {
  $generated: new Date().toISOString(),
  version: '0.1.0',
  entries,
  styles,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(registry, null, 2) + '\n', 'utf8');

const totalEntries = Object.keys(entries).length;
const totalStyles = Object.keys(styles).length;
console.log(`feriko-ui registry built: ${totalEntries} entries, ${totalStyles} stylesheets.`);
