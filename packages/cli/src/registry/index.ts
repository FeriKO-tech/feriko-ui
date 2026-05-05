import rawRegistry from './components.json';
import type { Registry, RegistryEntry } from '../types';

const registry = rawRegistry as unknown as Registry;

export function getRegistry(): Registry {
  return registry;
}

export function listComponents(): Array<[string, RegistryEntry]> {
  return Object.entries(registry.entries)
    .filter(([, entry]) => entry.kind === 'component')
    .sort(([a], [b]) => a.localeCompare(b));
}

export function listHooks(): Array<[string, RegistryEntry]> {
  return Object.entries(registry.entries)
    .filter(([, entry]) => entry.kind === 'hook')
    .sort(([a], [b]) => a.localeCompare(b));
}

export function listUtils(): Array<[string, RegistryEntry]> {
  return Object.entries(registry.entries)
    .filter(([, entry]) => entry.kind === 'util')
    .sort(([a], [b]) => a.localeCompare(b));
}

export function findEntry(nameOrAlias: string): { key: string; entry: RegistryEntry } | null {
  const key = nameOrAlias.trim().toLowerCase();
  const entry = registry.entries[key];
  if (entry) return { key, entry };
  return null;
}

/**
 * Walks the dependency graph of `names` and returns a deduplicated install order
 * (deps come before their dependants).
 */
export function resolveInstallOrder(names: string[]): string[] {
  const visited = new Set<string>();
  const order: string[] = [];

  function visit(name: string) {
    const found = findEntry(name);
    if (!found) throw new Error(`Unknown component / hook / util: "${name}"`);
    if (visited.has(found.key)) return;
    visited.add(found.key);
    for (const dep of found.entry.deps ?? []) visit(dep);
    order.push(found.key);
  }

  for (const name of names) visit(name);
  return order;
}
