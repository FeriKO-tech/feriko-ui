import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils/cn';

const buttonVariants = cva('fui fui-btn', {
  variants: {
    variant: {
      primary: 'fui-btn--primary',
      ghost: 'fui-btn--ghost',
      danger: 'fui-btn--danger',
      neon: 'fui-btn--neon',
      link: 'fui-btn--link',
    },
    size: {
      sm: 'fui-btn--sm',
      md: 'fui-btn--md',
      lg: 'fui-btn--lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a different element via `asChild` is not supported yet; use a wrapper for now. */
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, leadingIcon, trailingIcon, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </button>
  );
});

export { buttonVariants };
