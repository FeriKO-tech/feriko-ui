import * as React from 'react';

import { cn } from '../utils/cn';

export interface ScanlineOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional: render without any motion animation. */
  static?: boolean;
}

/**
 * Wraps its children and overlays CRT-style horizontal scanlines. Set `position`
 * via CSS if you need a specific layout; the overlay itself is absolutely
 * positioned with `pointer-events: none`, so clicks pass through.
 */
export const ScanlineOverlay = React.forwardRef<HTMLDivElement, ScanlineOverlayProps>(
  function ScanlineOverlay({ className, static: isStatic, children, style, ...rest }, ref) {
    const mergedStyle = isStatic
      ? { ...style, animation: 'none' as const }
      : style;

    return (
      <div ref={ref} className={cn('fui fui-scanlines', className)} style={mergedStyle} {...rest}>
        {children}
      </div>
    );
  },
);
