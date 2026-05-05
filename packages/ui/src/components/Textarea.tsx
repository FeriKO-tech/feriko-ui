import * as React from 'react';

import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, wrapperClassName, label, hint, error, id, rows = 5, ...rest },
  ref,
) {
  const autoId = React.useId();
  const areaId = id ?? autoId;
  const invalid = Boolean(error);

  return (
    <label htmlFor={areaId} className={cn('fui fui-field', wrapperClassName)}>
      {label ? <span className="fui-field__label">{label}</span> : null}
      <textarea
        ref={ref}
        id={areaId}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn('fui-textarea', invalid && 'fui-textarea--invalid', className)}
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
