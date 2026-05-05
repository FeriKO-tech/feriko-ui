import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_CONFIG, type FerikoConfig } from '../types';

export const CONFIG_FILENAME = 'feriko.config.json';

export function resolveConfigPath(cwd: string = process.cwd()): string {
  return join(cwd, CONFIG_FILENAME);
}

export function readConfig(cwd: string = process.cwd()): FerikoConfig | null {
  const path = resolveConfigPath(cwd);
  if (!existsSync(path)) return null;
  try {
    const raw = readFileSync(path, 'utf8');
    const parsed = JSON.parse(raw) as Partial<FerikoConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (err) {
    throw new Error(`Failed to read ${CONFIG_FILENAME}: ${(err as Error).message}`);
  }
}

export function writeConfig(config: FerikoConfig, cwd: string = process.cwd()): string {
  const path = resolveConfigPath(cwd);
  writeFileSync(path, JSON.stringify(config, null, 2) + '\n', 'utf8');
  return path;
}

export function requireConfig(cwd: string = process.cwd()): FerikoConfig {
  const config = readConfig(cwd);
  if (!config) {
    throw new Error(
      `No ${CONFIG_FILENAME} found. Run \`feriko-ui init\` first or pass --cwd to an initialised project.`,
    );
  }
  return config;
}
