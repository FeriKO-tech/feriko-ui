import * as React from 'react';

import { cn } from '../utils/cn';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current 1-indexed page. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called when the user picks a new page. */
  onPageChange: (page: number) => void;
  /** How many page buttons to show on each side of the current page. Default: 1. */
  siblingCount?: number;
  /** Always render page 1 and page `pageCount` (with ellipsis when needed). Default: true. */
  showBoundaries?: boolean;
  /** Show previous / next buttons. Default: true. */
  showControls?: boolean;
  /** Label for the previous button. */
  prevLabel?: React.ReactNode;
  /** Label for the next button. */
  nextLabel?: React.ReactNode;
  /** Accessible label for the nav. Default: `Pagination`. */
  ariaLabel?: string;
}

type PaginationItem = { type: 'page'; page: number } | { type: 'ellipsis'; key: string };

function buildRange(
  page: number,
  pageCount: number,
  siblingCount: number,
  showBoundaries: boolean,
): PaginationItem[] {
  if (pageCount <= 0) return [];
  const items: PaginationItem[] = [];
  const firstPage = 1;
  const lastPage = pageCount;
  const leftSibling = Math.max(page - siblingCount, firstPage);
  const rightSibling = Math.min(page + siblingCount, lastPage);

  const showLeftEllipsis = showBoundaries && leftSibling > firstPage + 1;
  const showRightEllipsis = showBoundaries && rightSibling < lastPage - 1;

  if (showBoundaries) {
    items.push({ type: 'page', page: firstPage });
    if (showLeftEllipsis) items.push({ type: 'ellipsis', key: 'left' });
    else if (leftSibling === firstPage + 1) items.push({ type: 'page', page: firstPage + 1 });
  }

  const start = showBoundaries ? Math.max(leftSibling, firstPage + 1) : leftSibling;
  const end = showBoundaries ? Math.min(rightSibling, lastPage - 1) : rightSibling;
  for (let p = start; p <= end; p++) {
    if (p === firstPage && showBoundaries) continue;
    if (p === lastPage && showBoundaries) continue;
    items.push({ type: 'page', page: p });
  }

  if (showBoundaries && lastPage !== firstPage) {
    if (showRightEllipsis) items.push({ type: 'ellipsis', key: 'right' });
    else if (rightSibling === lastPage - 1) items.push({ type: 'page', page: lastPage - 1 });
    items.push({ type: 'page', page: lastPage });
  }

  const seen = new Set<number>();
  return items.filter((item) => {
    if (item.type === 'ellipsis') return true;
    if (seen.has(item.page)) return false;
    seen.add(item.page);
    return true;
  });
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showBoundaries = true,
  showControls = true,
  prevLabel = '‹',
  nextLabel = '›',
  ariaLabel = 'Pagination',
  className,
  ...rest
}) => {
  const items = React.useMemo(
    () => buildRange(page, pageCount, siblingCount, showBoundaries),
    [page, pageCount, siblingCount, showBoundaries],
  );

  const clamp = (next: number) => Math.min(Math.max(next, 1), Math.max(pageCount, 1));
  const go = (next: number) => {
    const clamped = clamp(next);
    if (clamped !== page) onPageChange(clamped);
  };

  return (
    <nav aria-label={ariaLabel} className={cn('fui fui-pagination', className)} {...rest}>
      {showControls ? (
        <button
          type="button"
          className="fui-pagination__item"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
        >
          {prevLabel}
        </button>
      ) : null}
      {items.map((item) =>
        item.type === 'ellipsis' ? (
          <span key={item.key} aria-hidden className="fui-pagination__ellipsis">
            …
          </span>
        ) : (
          <button
            key={item.page}
            type="button"
            className="fui-pagination__item"
            aria-current={item.page === page ? 'page' : undefined}
            aria-label={`Go to page ${item.page}`}
            onClick={() => go(item.page)}
          >
            {item.page}
          </button>
        ),
      )}
      {showControls ? (
        <button
          type="button"
          className="fui-pagination__item"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => go(page + 1)}
        >
          {nextLabel}
        </button>
      ) : null}
    </nav>
  );
};
