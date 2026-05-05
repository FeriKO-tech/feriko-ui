import * as React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../utils/cn';
import { useFocusTrap } from '../hooks/useFocusTrap';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  /** Which edge of the viewport the drawer slides in from. Default: `right`. */
  side?: DrawerSide;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  hideClose?: boolean;
  disableBackdropClose?: boolean;
  disableEscapeClose?: boolean;
  backdropClassName?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  side = 'right',
  title,
  description,
  footer,
  hideClose,
  disableBackdropClose,
  disableEscapeClose,
  className,
  backdropClassName,
  children,
  ...rest
}) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  useFocusTrap(panelRef, open);

  React.useEffect(() => {
    if (!open || disableEscapeClose) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, disableEscapeClose, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const handleBackdropClick = () => {
    if (!disableBackdropClose) onClose();
  };

  return createPortal(
    <>
      <div
        className={cn('fui fui-drawer__backdrop', backdropClassName)}
        onMouseDown={handleBackdropClick}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn('fui fui-drawer', `fui-drawer--${side}`, className)}
        {...rest}
      >
        {(title || !hideClose) && (
          <header className="fui-modal__header">
            <div>
              {title ? (
                <h2 id={titleId} className="fui-modal__title">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id={descriptionId} className="fui-modal__description">
                  {description}
                </p>
              ) : null}
            </div>
            {!hideClose ? (
              <button
                type="button"
                aria-label="Close"
                className="fui-modal__close"
                onClick={onClose}
              >
                ×
              </button>
            ) : null}
          </header>
        )}
        {children}
        {footer ? <div className="fui-modal__footer">{footer}</div> : null}
      </div>
    </>,
    document.body,
  );
};
