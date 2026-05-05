import * as React from 'react';

import { cn } from '../utils/cn';

interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
  baseId: string;
  registerTrigger: (value: string, node: HTMLButtonElement | null) => void;
  triggers: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(where: string): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error(`<${where}> must be used inside <Tabs>.`);
  return ctx;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Controlled active tab value. */
  value?: string;
  /** Uncontrolled default. */
  defaultValue?: string;
  /** Called whenever the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Keyboard navigation direction. Default: `horizontal`. */
  orientation?: 'horizontal' | 'vertical';
}

export const Tabs: React.FC<TabsProps> = ({
  value: controlled,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...rest
}) => {
  const baseId = React.useId();
  const [uncontrolled, setUncontrolled] = React.useState<string>(defaultValue ?? '');
  const value = controlled ?? uncontrolled;
  const triggers = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const setValue = React.useCallback(
    (next: string) => {
      if (controlled === undefined) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  const registerTrigger = React.useCallback((val: string, node: HTMLButtonElement | null) => {
    if (node) {
      triggers.current.set(val, node);
    } else {
      triggers.current.delete(val);
    }
  }, []);

  const ctx: TabsContextValue = React.useMemo(
    () => ({ value, setValue, baseId, registerTrigger, triggers, orientation }),
    [value, setValue, baseId, registerTrigger, orientation],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn('fui fui-tabs', className)} data-orientation={orientation} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...rest }) => {
  const { orientation } = useTabsContext('TabsList');
  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);
  const ctx = useTabsContext('TabsList');

  React.useLayoutEffect(() => {
    const selected = ctx.triggers.current.get(ctx.value);
    const list = listRef.current;
    if (!selected || !list) {
      setIndicator(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const triggerRect = selected.getBoundingClientRect();
    setIndicator({
      left: triggerRect.left - listRect.left,
      width: triggerRect.width,
    });
  }, [ctx.value, ctx.triggers]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn('fui-tabs__list', className)}
      {...rest}
    >
      {indicator ? (
        <span
          aria-hidden
          className="fui-tabs__indicator"
          style={{ left: indicator.left, width: indicator.width }}
        />
      ) : null}
      {children}
    </div>
  );
};

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value this tab represents. */
  value: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled,
  className,
  onKeyDown,
  children,
  ...rest
}) => {
  const ctx = useTabsContext('TabsTrigger');
  const ref = React.useRef<HTMLButtonElement>(null);
  const selected = ctx.value === value;

  React.useEffect(() => {
    ctx.registerTrigger(value, ref.current);
    return () => ctx.registerTrigger(value, null);
  }, [ctx, value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const keys =
      ctx.orientation === 'horizontal'
        ? { next: 'ArrowRight', prev: 'ArrowLeft' }
        : { next: 'ArrowDown', prev: 'ArrowUp' };
    if (![keys.next, keys.prev, 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const entries = Array.from(ctx.triggers.current.entries()).filter(
      ([, node]) => !node.disabled,
    );
    if (entries.length === 0) return;
    const currentIndex = entries.findIndex(([val]) => val === ctx.value);
    let nextIndex = currentIndex;
    if (event.key === keys.next) nextIndex = (currentIndex + 1) % entries.length;
    else if (event.key === keys.prev) nextIndex = (currentIndex - 1 + entries.length) % entries.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = entries.length - 1;
    const nextEntry = entries[nextIndex];
    if (!nextEntry) return;
    const [nextValue, nextNode] = nextEntry;
    ctx.setValue(nextValue);
    nextNode.focus();
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      id={`${ctx.baseId}-trigger-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={cn('fui-tabs__trigger', className)}
      onClick={() => ctx.setValue(value)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep the panel in the DOM when not selected (hidden via `hidden` attribute). Default: false. */
  keepMounted?: boolean;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  keepMounted,
  className,
  children,
  ...rest
}) => {
  const ctx = useTabsContext('TabsContent');
  const selected = ctx.value === value;

  if (!selected && !keepMounted) return null;

  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-trigger-${value}`}
      tabIndex={0}
      hidden={!selected}
      className={cn('fui-tabs__content', className)}
      {...rest}
    >
      {children}
    </div>
  );
};
