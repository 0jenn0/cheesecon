import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import SelectProvider from './provider/select-provider';
import { SelectList, SelectPlaceholder } from './ui';

export interface SelectProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  label: string;
  options: string[];
  isError?: boolean;
  disabled?: boolean;
  placeholderClassName?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  defaultValue,
  ...props
}: SelectProps) {
  return (
    <SelectProvider>
      <div className={cn('relative cursor-pointer', className)} {...props}>
        <SelectPlaceholder
          label={label}
          placeholder={label}
          isError={isError}
          disabled={disabled}
          className={placeholderClassName}
          selectClassName={placeholderClassName || ''}
          trailingIcon='chevron-down'
          onChange={onChange}
          name={name}
          defaultValue={defaultValue as string}
        />
        <SelectList options={options} name={name} />
      </div>
    </SelectProvider>
  );
}
