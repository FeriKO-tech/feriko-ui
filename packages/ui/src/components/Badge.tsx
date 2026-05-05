import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils/cn';

const badgeVariants = cva('fui fui-badge', {
  variants: {
    tone: {
      default: '',
      accent: 'fui-badge--accent',
      success: 'fui-badge--success',
      danger: 'fui-badge--danger',
      warning: 'fui-badge--warning',
      info: 'fui-badge--info',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Render a coloured pulsing dot before the content. */
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone, dot, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ tone }), className)} {...rest}>
      {dot ? <span aria-hidden className="fui-badge__dot" /> : null}
      {children}
    </span>
  );
});

export { badgeVariants };
