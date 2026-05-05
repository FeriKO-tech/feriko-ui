import { clsx, type ClassValue } from 'clsx';

/**
 * Tiny class-name joiner used by every feriko-ui component.
 * Re-exports `clsx` so consumers can use the same helper if they want.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
