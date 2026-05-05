import * as React from 'react';

import { cn } from '../utils/cn';

export interface NeonBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a double drop-shadow halo around the whole element. */
  glow?: boolean;
}

export const NeonBorder = React.forwardRef<HTMLDivElement, NeonBorderProps>(function NeonBorder(
  { className, glow, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('fui fui-neon', glow && 'fui-neon--glow', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
