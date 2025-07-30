import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import SelectProvider from './provider/select-provider';
import { SelectList, SelectPlaceholder } from './ui';

export interface SelectProps extends ComponentPropsWithRef<'ul'> {
  label: string;
  options: string[];
  isError?: boolean;
  disabled?: boolean;
}

export default function Select({
  label,
  options,
  isError = false,
  disabled = false,
  className,
  ...props
}: SelectProps) {
  return (
    <SelectProvider>
      <div className={cn('relative', className)}>
        <SelectPlaceholder
          label={label}
          isError={isError}
          disabled={disabled}
        />
        <SelectList options={options} {...props} />
      </div>
    </SelectProvider>
  );
}
