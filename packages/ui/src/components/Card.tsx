import * as React from 'react';

import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift + glow border. Useful for clickable cards. */
  interactive?: boolean;
  /** Forces a permanent accent glow border (for featured / selected cards). */
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, interactive, glow, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'fui fui-card',
        interactive && 'fui-card--interactive',
        glow && 'fui-card--glow',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function CardTitle({ className, children, ...rest }, ref) {
  return (
    <h3 ref={ref} className={cn('fui-card__title', className)} {...rest}>
      {children}
    </h3>
  );
});

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, children, ...rest }, ref) {
  return (
    <p ref={ref} className={cn('fui-card__description', className)} {...rest}>
      {children}
    </p>
  );
});
