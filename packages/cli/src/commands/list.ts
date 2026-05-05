import { listComponents, listHooks, listUtils } from '../registry';
import { log, c } from '../utils/log';

export function runList(): void {
  const components = listComponents();
  const hooks = listHooks();
  const utils = listUtils();

  log.title('Components');
  for (const [key, entry] of components) {
    log.plain(`  ${c.cyan(key.padEnd(18))} ${c.dim(entry.description ?? '')}`);
  }
  log.plain('');

  log.title('Hooks');
  for (const [key, entry] of hooks) {
    log.plain(`  ${c.cyan(key.padEnd(18))} ${c.dim(entry.description ?? '')}`);
  }
  log.plain('');

  log.title('Utils');
  for (const [key, entry] of utils) {
    log.plain(`  ${c.cyan(key.padEnd(18))} ${c.dim(entry.description ?? '')}`);
  }
  log.plain('');
  log.dim('Run `feriko-ui add <name>` to install one.');
}
