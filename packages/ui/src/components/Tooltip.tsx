import * as React from 'react';
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import { cn } from '../utils/cn';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface TooltipProps {
  /** The tooltip body. If nullish the tooltip stays hidden. */
  content: React.ReactNode;
  /** The element the tooltip is anchored to. Must forward refs + event handlers (a DOM node or a `forwardRef` component). */
  children: React.ReactElement;
  /** Floating-ui placement. Default: `top`. */
  placement?: TooltipPlacement;
  /** Delay (ms) before opening on hover. Default: 120. */
  delay?: number;
  /** Delay (ms) before closing once the cursor leaves. Default: 80. */
  closeDelay?: number;
  /** Additional className applied to the tooltip bubble. */
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 120,
  closeDelay = 80,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const arrowRef = React.useRef<SVGSVGElement | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: delay, close: closeDelay } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const child = React.Children.only(children);
  const anchor = React.cloneElement(child, getReferenceProps({ ref: refs.setReference, ...child.props }));

  return (
    <>
      {anchor}
      {open && content != null ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={cn('fui fui-tooltip', className)}
            {...getFloatingProps()}
          >
            {content}
            <FloatingArrow ref={arrowRef} context={context} className="fui-tooltip__arrow" />
          </div>
        </FloatingPortal>
      ) : null}
    </>
  );
};
