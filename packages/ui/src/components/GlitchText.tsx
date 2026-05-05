import * as React from 'react';

import { cn } from '../utils/cn';

type GlitchTag = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';

export interface GlitchTextProps extends React.HTMLAttributes<HTMLElement> {
  /** The text to display. Also echoed via a `data-text` attribute so CSS pseudo-elements can duplicate it. */
  text: string;
  /** HTML tag used for the wrapper (default: `span`). */
  as?: GlitchTag;
}

export const GlitchText = React.forwardRef<HTMLElement, GlitchTextProps>(function GlitchText(
  { text, as = 'span', className, ...rest },
  ref,
) {
  return React.createElement(
    as,
    {
      ref,
      'data-text': text,
      className: cn('fui fui-glitch', className),
      ...rest,
    },
    text,
  );
});
