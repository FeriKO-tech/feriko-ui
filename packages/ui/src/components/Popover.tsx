import * as React from 'react';
import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';

import { cn } from '../utils/cn';
import type { TooltipPlacement } from './Tooltip';

export interface PopoverProps {
  /** Popover body. Receives focus management via floating-ui. */
  content: React.ReactNode;
  /** The trigger. Click toggles the popover. */
  children: React.ReactElement;
  /** Floating-ui placement. Default: `bottom`. */
  placement?: TooltipPlacement;
  /** Controlled open state. If omitted the popover manages its own state. */
  open?: boolean;
  /** Called when the open state changes (controlled mode). */
  onOpenChange?: (open: boolean) => void;
  /** Disable the built-in arrow element. Default: false. */
  hideArrow?: boolean;
  /** Additional className applied to the popover body. */
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  hideArrow,
  className,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const arrowRef = React.useRef<SVGSVGElement | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(10), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const child = React.Children.only(children);
  const anchor = React.cloneElement(
    child,
    getReferenceProps({
      ref: refs.setReference,
      'aria-expanded': open,
      ...child.props,
    }),
  );

  return (
    <>
      {anchor}
      {open ? (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={cn('fui fui-popover', className)}
              {...getFloatingProps()}
            >
              {content}
              {!hideArrow ? (
                <FloatingArrow ref={arrowRef} context={context} className="fui-popover__arrow" />
              ) : null}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      ) : null}
    </>
  );
};
