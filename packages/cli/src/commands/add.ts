import { basename } from 'node:path';
import prompts from 'prompts';
import { requireConfig } from '../utils/config';
import { writeFileSafe, joinPath, fileExists } from '../utils/files';
import { log, c } from '../utils/log';
import { findEntry, resolveInstallOrder } from '../registry';
import type { FerikoConfig, RegistryEntry } from '../types';

export interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
  cwd?: string;
}

function resolveTargetDir(config: FerikoConfig, entry: RegistryEntry): string {
  switch (entry.kind) {
    case 'component':
      return config.componentsDir;
    case 'hook':
      return config.hooksDir;
    case 'util':
      return config.utilsDir;
  }
}

export async function runAdd(names: string[], options: AddOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  const config = requireConfig(cwd);

  if (options.all) {
    const all = Object.keys((await import('../registry')).getRegistry().entries);
    names = all;
  }

  if (names.length === 0) {
    log.error('Pick at least one component. Use `feriko-ui list` to see available names.');
    process.exit(1);
  }

  const order = resolveInstallOrder(names);
  log.dim(`Install order: ${order.join(' → ')}`);

  let written = 0;
  let skipped = 0;

  for (const name of order) {
    const found = findEntry(name);
    if (!found) continue;
    const { entry } = found;
    const targetDir = resolveTargetDir(config, entry);

    for (const file of entry.contents) {
      const destPath = joinPath(cwd, targetDir, basename(file.path));
      if (fileExists(destPath) && !options.overwrite) {
        const response = await prompts(
          {
            type: 'confirm',
            name: 'overwrite',
            message: `${c.yellow(basename(file.path))} already exists. Overwrite?`,
            initial: false,
          },
          { onCancel: () => process.exit(0) },
        );
        if (!response.overwrite) {
          log.warn(`Skipped ${targetDir}/${basename(file.path)}`);
          skipped++;
          continue;
        }
      }
      writeFileSafe(destPath, file.source);
      log.success(`Wrote ${targetDir}/${basename(file.path)}`);
      written++;
    }
  }

  log.plain('');
  log.title(`Done: ${written} written, ${skipped} skipped.`);
  log.dim(
    `Make sure your entry imports '${config.stylesDir}/feriko-variables.css' and '${config.stylesDir}/feriko-components.css'.`,
  );
}
