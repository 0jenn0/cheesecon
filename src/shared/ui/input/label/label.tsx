import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { labelStyle, trailingLabelVariants } from './label.style';

export const LABEL_TYPE_VARIANTS = ['default', 'required', 'optional'] as const;

export interface LabelProps extends ComponentPropsWithRef<'label'> {
  type?: (typeof LABEL_TYPE_VARIANTS)[number];
}

export default function Label({
  children,
  type = 'default',
  className,
  ...props
}: LabelProps) {
  const trailingLabel = getTrailingLabel(type);

  return (
    <label className={cn(labelStyle, className)} {...props}>
      {children}
      {trailingLabel && (
        <span className={trailingLabelVariants({ type })}>{trailingLabel}</span>
      )}
    </label>
  );
}

function getTrailingLabel(type: LabelProps['type']) {
  return type === 'required' ? '*' : type === 'optional' ? ' (선택사항)' : '';
}
