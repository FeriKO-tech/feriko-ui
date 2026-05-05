import * as React from 'react';

import { cn } from '../utils/cn';

export interface TerminalBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text shown in the terminal title bar. Defaults to `~/feriko`. */
  title?: string;
  /** The terminal body. Newlines are preserved (`white-space: pre`). */
  children?: React.ReactNode;
  /** When true, each line is prefixed with `$ `. Good for command logs. */
  prompt?: boolean;
}

export const TerminalBlock = React.forwardRef<HTMLDivElement, TerminalBlockProps>(
  function TerminalBlock({ title = '~/feriko', className, children, prompt, ...rest }, ref) {
    const body =
      prompt && typeof children === 'string'
        ? children
            .split('\n')
            .map((line, i) => (
              <div key={i}>
                <span className="fui-terminal__prompt">$</span>
                {line}
              </div>
            ))
        : children;

    return (
      <div ref={ref} className={cn('fui fui-terminal', className)} {...rest}>
        <header className="fui-terminal__header">
          <span className="fui-terminal__dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="fui-terminal__title">{title}</span>
        </header>
        <pre className="fui-terminal__body">{body}</pre>
      </div>
    );
  },
);
