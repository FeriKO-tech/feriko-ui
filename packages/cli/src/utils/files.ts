import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function ensureDir(dirPath: string): void {
  mkdirSync(dirPath, { recursive: true });
}

export function writeFileSafe(filePath: string, contents: string): void {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, contents, 'utf8');
}

export function fileExists(filePath: string): boolean {
  return existsSync(filePath);
}

export function readFileIfExists(filePath: string): string | null {
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, 'utf8');
}

export function joinPath(...segments: string[]): string {
  return join(...segments);
}
