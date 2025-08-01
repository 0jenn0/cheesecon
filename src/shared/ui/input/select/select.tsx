import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import SelectProvider from './provider/select-provider';
import { SelectList, SelectPlaceholder } from './ui';

export interface SelectProps extends ComponentPropsWithRef<'div'> {
  label: string;
  options: string[];
  isError?: boolean;
  disabled?: boolean;
  placeholderClassName?: string;
  name?: string;
}

export default function Select({
  label,
  options,
  isError = false,
  disabled = false,
  className,
  placeholderClassName,
  onChange,
  name,
  ...props
}: SelectProps) {
  return (
    <SelectProvider>
      <div className={cn('relative', className)} {...props}>
        <SelectPlaceholder
          label={label}
          isError={isError}
          disabled={disabled}
          className={placeholderClassName}
          onChange={onChange}
          name={name}
        />
        <SelectList options={options} />
      </div>
    </SelectProvider>
  );
}
