export type EntryKind = 'component' | 'hook' | 'util';

export interface RegistryFile {
  path: string;
  source: string;
}

export interface RegistryEntry {
  kind: EntryKind;
  files: string[];
  deps?: string[];
  description?: string;
  contents: RegistryFile[];
}

export interface RegistryStyle {
  file: string;
  description: string;
  source: string;
}

export interface Registry {
  $generated: string;
  version: string;
  entries: Record<string, RegistryEntry>;
  styles: Record<string, RegistryStyle>;
}

export interface FerikoConfig {
  /** Where component `.tsx` files are written (relative to the project root). */
  componentsDir: string;
  /** Where hook files are written. */
  hooksDir: string;
  /** Where utility files are written. */
  utilsDir: string;
  /** Where CSS is written (variables + components). */
  stylesDir: string;
  /** Preferred import alias for components. e.g. "@/components/ui". */
  alias: string;
  /** Which bundled themes to emit in `variables.css`. */
  themes: string[];
}

export const DEFAULT_CONFIG: FerikoConfig = {
  componentsDir: 'src/components/ui',
  hooksDir: 'src/hooks',
  utilsDir: 'src/lib',
  stylesDir: 'src/styles',
  alias: '@/components/ui',
  themes: ['cyberpunk', 'synthwave', 'tokyo-night', 'dark-fantasy'],
};
