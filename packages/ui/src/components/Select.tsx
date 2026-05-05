import * as React from 'react';

import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, wrapperClassName, label, hint, error, id, options, children, ...rest },
  ref,
) {
  const autoId = React.useId();
  const selectId = id ?? autoId;
  const invalid = Boolean(error);

  return (
    <label htmlFor={selectId} className={cn('fui fui-field', wrapperClassName)}>
      {label ? <span className="fui-field__label">{label}</span> : null}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={invalid || undefined}
        className={cn('fui-select', invalid && 'fui-select--invalid', className)}
        {...rest}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error ? (
        <span className="fui-field__error">{error}</span>
      ) : hint ? (
        <span className="fui-field__hint">{hint}</span>
      ) : null}
    </label>
  );
});
