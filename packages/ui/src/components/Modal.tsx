import * as React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../utils/cn';
import { useFocusTrap } from '../hooks/useFocusTrap';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Controls visibility. When false, the modal is not rendered. */
  open: boolean;
  /** Called when the user dismisses via Escape, backdrop click, or the close button. */
  onClose: () => void;
  /** Rendered in the header slot with semantic role `heading`. */
  title?: React.ReactNode;
  /** Rendered under the title as dim secondary text. */
  description?: React.ReactNode;
  /** Optional footer. Commonly an action row (Cancel / Confirm). */
  footer?: React.ReactNode;
  /** Hide the built-in close button. Default: false. */
  hideClose?: boolean;
  /** Disable closing on backdrop click. Default: false. */
  disableBackdropClose?: boolean;
  /** Disable closing on Escape. Default: false. */
  disableEscapeClose?: boolean;
  /** Optional className for the backdrop element. */
  backdropClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
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

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disableBackdropClose) return;
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={cn('fui fui-modal__backdrop', backdropClassName)}
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn('fui-modal', className)}
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
    </div>,
    document.body,
  );
};
