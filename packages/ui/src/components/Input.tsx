import * as React from 'react';

import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Rendered above the input in uppercase mono. */
  label?: string;
  /** Rendered below the input (small, faint). */
  hint?: string;
  /** Overrides `hint` and switches colours to the danger palette. */
  error?: string;
  /** Optional wrapper className (the surrounding <label>). */
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, wrapperClassName, label, hint, error, id, ...rest },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const invalid = Boolean(error);

  return (
    <label htmlFor={inputId} className={cn('fui fui-field', wrapperClassName)}>
      {label ? <span className="fui-field__label">{label}</span> : null}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={invalid || undefined}
        className={cn('fui-input', invalid && 'fui-input--invalid', className)}
        {...rest}
      />
      {error ? (
        <span className="fui-field__error">{error}</span>
      ) : hint ? (
        <span className="fui-field__hint">{hint}</span>
      ) : null}
    </label>
  );
});
