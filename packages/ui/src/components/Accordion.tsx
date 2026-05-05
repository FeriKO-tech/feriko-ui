import * as React from 'react';

import { cn } from '../utils/cn';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  openItems: Set<string>;
  toggle: (value: string) => void;
  collapsible: boolean;
  baseId: string;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext(where: string): AccordionContextValue {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error(`<${where}> must be used inside <Accordion>.`);
  return ctx;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Single-open (`'single'`) or many-open (`'multiple'`). Default: `'single'`. */
  type?: AccordionType;
  /** Controlled value. Array for `multiple`, string for `single`. */
  value?: string | string[];
  /** Uncontrolled initial value. */
  defaultValue?: string | string[];
  /** Called when the open items change. */
  onValueChange?: (value: string | string[]) => void;
  /** When `type='single'`, allow closing the currently open item. Default: `true`. */
  collapsible?: boolean;
}

function toSet(value: string | string[] | undefined): Set<string> {
  if (!value) return new Set();
  return new Set(Array.isArray(value) ? value : [value]);
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  value: controlled,
  defaultValue,
  onValueChange,
  collapsible = true,
  className,
  children,
  ...rest
}) => {
  const baseId = React.useId();
  const [uncontrolled, setUncontrolled] = React.useState<Set<string>>(() => toSet(defaultValue));
  const openItems = controlled !== undefined ? toSet(controlled) : uncontrolled;

  const emit = (next: Set<string>) => {
    if (controlled === undefined) setUncontrolled(next);
    if (!onValueChange) return;
    if (type === 'single') {
      onValueChange(next.values().next().value ?? '');
    } else {
      onValueChange(Array.from(next));
    }
  };

  const toggle = (value: string) => {
    const next = new Set(openItems);
    if (next.has(value)) {
      if (type === 'single' && !collapsible) return;
      next.delete(value);
    } else {
      if (type === 'single') next.clear();
      next.add(value);
    }
    emit(next);
  };

  const ctx: AccordionContextValue = React.useMemo(
    () => ({ type, openItems, toggle, collapsible, baseId }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, Array.from(openItems).join('|'), collapsible, baseId],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={cn('fui fui-accordion', className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(where: string): AccordionItemContextValue {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error(`<${where}> must be used inside <AccordionItem>.`);
  return ctx;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  className,
  children,
  ...rest
}) => {
  const ctx = useAccordionContext('AccordionItem');
  const open = ctx.openItems.has(value);
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const contentId = `${ctx.baseId}-content-${value}`;

  const itemCtx: AccordionItemContextValue = React.useMemo(
    () => ({ value, open, triggerId, contentId }),
    [value, open, triggerId, contentId],
  );

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div
        className={cn('fui-accordion__item', className)}
        data-state={open ? 'open' : 'closed'}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Hide the default chevron. */
  hideChevron?: boolean;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  hideChevron,
  className,
  children,
  onClick,
  ...rest
}) => {
  const root = useAccordionContext('AccordionTrigger');
  const item = useAccordionItemContext('AccordionTrigger');

  return (
    <button
      type="button"
      id={item.triggerId}
      aria-expanded={item.open}
      aria-controls={item.contentId}
      className={cn('fui-accordion__trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        root.toggle(item.value);
      }}
      {...rest}
    >
      <span>{children}</span>
      {!hideChevron ? <span aria-hidden className="fui-accordion__chevron" /> : null}
    </button>
  );
};

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Keep the content mounted when closed. Default: false. */
  keepMounted?: boolean;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  keepMounted,
  className,
  children,
  ...rest
}) => {
  const item = useAccordionItemContext('AccordionContent');
  if (!item.open && !keepMounted) return null;
  return (
    <div
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      hidden={!item.open}
      className={cn('fui-accordion__content', className)}
      {...rest}
    >
      {children}
    </div>
  );
};
