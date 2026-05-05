import prompts from 'prompts';
import { CONFIG_FILENAME, readConfig, writeConfig } from '../utils/config';
import { writeFileSafe, joinPath, fileExists } from '../utils/files';
import { log } from '../utils/log';
import { DEFAULT_CONFIG, type FerikoConfig } from '../types';
import { getRegistry } from '../registry';

export interface InitOptions {
  yes?: boolean;
  cwd?: string;
}

export async function runInit(options: InitOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  const existing = readConfig(cwd);
  if (existing) {
    log.warn(`${CONFIG_FILENAME} already exists - skipping scaffolding.`);
    log.dim(`Edit ${CONFIG_FILENAME} manually or delete it to re-run init.`);
    return;
  }

  let config: FerikoConfig = { ...DEFAULT_CONFIG };

  if (!options.yes) {
    const answers = await prompts(
      [
        {
          type: 'text',
          name: 'componentsDir',
          message: 'Where should components be written?',
          initial: config.componentsDir,
        },
        {
          type: 'text',
          name: 'hooksDir',
          message: 'Where should hooks be written?',
          initial: config.hooksDir,
        },
        {
          type: 'text',
          name: 'utilsDir',
          message: 'Where should utils be written?',
          initial: config.utilsDir,
        },
        {
          type: 'text',
          name: 'stylesDir',
          message: 'Where should CSS files be written?',
          initial: config.stylesDir,
        },
        {
          type: 'text',
          name: 'alias',
          message: 'Import alias for components (e.g. `@/components/ui`):',
          initial: config.alias,
        },
        {
          type: 'multiselect',
          name: 'themes',
          message: 'Which themes to include in variables.css?',
          choices: DEFAULT_CONFIG.themes.map((theme) => ({
            title: theme,
            value: theme,
            selected: true,
          })),
          min: 1,
          hint: 'Use space to toggle, enter to confirm.',
        },
      ],
      { onCancel: () => process.exit(0) },
    );
    config = { ...config, ...answers };
  }

  const configPath = writeConfig(config, cwd);
  log.success(`Created ${CONFIG_FILENAME}`);
  log.dim(`  ${configPath}`);

  // Emit the base stylesheet immediately so consumers have something to import.
  const registry = getRegistry();
  const variables = registry.styles.variables;
  const components = registry.styles.components;
  if (!variables || !components) {
    throw new Error('Registry is missing bundled stylesheets - rebuild the CLI.');
  }
  const stylesDir = joinPath(cwd, config.stylesDir);

  const variablesPath = joinPath(stylesDir, 'feriko-variables.css');
  const componentsPath = joinPath(stylesDir, 'feriko-components.css');

  if (!fileExists(variablesPath)) {
    writeFileSafe(variablesPath, filterThemes(variables.source, config.themes));
    log.success(`Wrote ${config.stylesDir}/feriko-variables.css`);
  } else {
    log.warn(`feriko-variables.css exists - skipping.`);
  }

  if (!fileExists(componentsPath)) {
    writeFileSafe(componentsPath, components.source);
    log.success(`Wrote ${config.stylesDir}/feriko-components.css`);
  } else {
    log.warn(`feriko-components.css exists - skipping.`);
  }

  log.plain('');
  log.title('Next steps');
  log.plain(`  1. Import the styles in your app entry:`);
  log.dim(`       import './${config.stylesDir}/feriko-variables.css';`);
  log.dim(`       import './${config.stylesDir}/feriko-components.css';`);
  log.plain(`  2. Add your first component:`);
  log.dim(`       npx feriko-ui add button`);
}

/**
 * Keep only the selected themes in the emitted variables.css. We look for theme
 * blocks delimited by `[data-feriko-theme='<name>']` and drop the rest.
 */
function filterThemes(source: string, themes: string[]): string {
  const allThemes = DEFAULT_CONFIG.themes;
  const toRemove = allThemes.filter((t) => !themes.includes(t));
  let result = source;
  for (const theme of toRemove) {
    const pattern = new RegExp(
      `\\[data-feriko-theme=['\"]${theme}['\"]\\][\\s\\S]*?\\n\\}\\n`,
      'g',
    );
    result = result.replace(pattern, '');
  }
  return result;
}
