import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(__dirname, '..');
const repoRoot = resolve(docsRoot, '..', '..');

function run(command, args, cwd) {
  const result =
    process.platform === 'win32'
      ? spawnSync([command, ...args.map(quoteArg)].join(' '), {
          cwd,
          stdio: 'inherit',
          shell: true,
        })
      : spawnSync(command, args, {
          cwd,
          stdio: 'inherit',
        });

  if (result.error) {
    console.error(result.error.message);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function quoteArg(value) {
  if (/^[\w@./:=+-]+$/.test(value)) return value;
  return `"${value.replace(/"/g, '\\"')}"`;
}

if (!repoRoot.includes('#')) {
  run('next', ['build'], docsRoot);
  process.exit(0);
}

const tempRoot = join(tmpdir(), `feriko-ui-docs-build-${process.pid}-${Date.now()}`);
const tempRepo = join(tempRoot, 'feriko-ui');

mkdirSync(tempRoot, { recursive: true });

cpSync(repoRoot, tempRepo, {
  recursive: true,
  filter(source) {
    const rel = source.slice(repoRoot.length).replace(/^[\\/]/, '').replace(/\\/g, '/');
    if (!rel) return true;
    return !(
      rel === '.git' ||
      rel.startsWith('.git/') ||
      rel === 'node_modules' ||
      rel.startsWith('node_modules/') ||
      rel.endsWith('/node_modules') ||
      rel.includes('/node_modules/') ||
      rel === '.next' ||
      rel.endsWith('/.next') ||
      rel.includes('/.next/') ||
      rel === 'dist' ||
      rel.endsWith('/dist') ||
      rel.includes('/dist/') ||
      rel === '.turbo' ||
      rel.endsWith('/.turbo') ||
      rel.includes('/.turbo/')
    );
  },
});

try {
  run('pnpm', ['install', '--frozen-lockfile'], tempRepo);
  run('pnpm', ['--filter', '@feriko/ui', 'build'], tempRepo);
  run('pnpm', ['--filter', '@feriko/docs', 'build:next'], tempRepo);

  const tempBuild = join(tempRepo, 'apps', 'docs', '.next');
  const targetBuild = join(docsRoot, '.next');
  if (existsSync(targetBuild)) rmSync(targetBuild, { recursive: true, force: true });
  cpSync(tempBuild, targetBuild, { recursive: true });
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
