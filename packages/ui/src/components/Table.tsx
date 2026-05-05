import * as React from 'react';

import { cn } from '../utils/cn';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, children, ...rest },
  ref,
) {
  return (
    <table ref={ref} className={cn('fui fui-table', className)} {...rest}>
      {children}
    </table>
  );
});

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, children, ...rest }, ref) {
    return (
      <caption ref={ref} className={cn('fui-table__caption', className)} {...rest}>
        {children}
      </caption>
    );
  },
);

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, children, ...rest }, ref) {
    return (
      <thead ref={ref} className={cn('fui-table__head', className)} {...rest}>
        {children}
      </thead>
    );
  },
);

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, children, ...rest }, ref) {
    return (
      <tbody ref={ref} className={className} {...rest}>
        {children}
      </tbody>
    );
  },
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Applies a subtle highlight to the row. */
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, selected, children, ...rest },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-selected={selected ? 'true' : undefined}
      className={cn('fui-table__row', className)}
      {...rest}
    >
      {children}
    </tr>
  );
});

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Marks the header as sortable, adding a chevron indicator and click handling. */
  sortable?: boolean;
  /** Current sort direction for this column (`'asc'`, `'desc'`, or `null`). */
  sortDirection?: SortDirection;
  /** Called when the user clicks or presses Enter / Space on a sortable header. */
  onSortToggle?: () => void;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, sortable, sortDirection = null, onSortToggle, children, onClick, onKeyDown, ...rest },
  ref,
) {
  const ariaSort: React.AriaAttributes['aria-sort'] = sortable
    ? sortDirection === 'asc'
      ? 'ascending'
      : sortDirection === 'desc'
        ? 'descending'
        : 'none'
    : undefined;

  const handleClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
    onClick?.(event);
    if (sortable && !event.defaultPrevented) onSortToggle?.();
  };

  const handleKey = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    onKeyDown?.(event);
    if (!sortable || event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSortToggle?.();
    }
  };

  return (
    <th
      ref={ref}
      scope="col"
      aria-sort={ariaSort}
      tabIndex={sortable ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKey}
      className={cn(
        'fui-table__head-cell',
        sortable && 'fui-table__head-cell--sortable',
        className,
      )}
      {...rest}
    >
      {children}
      {sortable ? (
        <span aria-hidden className="fui-table__sort-indicator">
          {sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '↕'}
        </span>
      ) : null}
    </th>
  );
});

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, children, ...rest },
  ref,
) {
  return (
    <td ref={ref} className={cn('fui-table__cell', className)} {...rest}>
      {children}
    </td>
  );
});
