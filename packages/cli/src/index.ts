import { cac } from 'cac';
import { runInit } from './commands/init';
import { runAdd } from './commands/add';
import { runList } from './commands/list';
import { log } from './utils/log';
import { getRegistry } from './registry';

const cli = cac('feriko-ui');

cli
  .command('init', 'Scaffold feriko.config.json and base CSS in the current project')
  .option('-y, --yes', 'Skip prompts and use the default config')
  .option('--cwd <dir>', 'Project root (defaults to current working directory)')
  .action(async (options: { yes?: boolean; cwd?: string }) => {
    try {
      await runInit({ yes: options.yes, cwd: options.cwd });
    } catch (err) {
      log.error((err as Error).message);
      process.exit(1);
    }
  });

cli
  .command('add [...names]', 'Copy one or more components (with their dependencies) into your project')
  .option('-a, --all', 'Install every registered component, hook, and util')
  .option('-o, --overwrite', 'Overwrite existing files without prompting')
  .option('--cwd <dir>', 'Project root')
  .action(async (names: string[], options: { all?: boolean; overwrite?: boolean; cwd?: string }) => {
    try {
      await runAdd(names ?? [], options);
    } catch (err) {
      log.error((err as Error).message);
      process.exit(1);
    }
  });

cli.command('list', 'List every component, hook, and util available in the registry').action(() => {
  try {
    runList();
  } catch (err) {
    log.error((err as Error).message);
    process.exit(1);
  }
});

cli
  .command('version', 'Print the CLI + registry version')
  .alias('--version')
  .action(() => {
    const registry = getRegistry();
    log.plain(`feriko-ui registry v${registry.version} (generated ${registry.$generated})`);
  });

cli.help();
cli.parse();
