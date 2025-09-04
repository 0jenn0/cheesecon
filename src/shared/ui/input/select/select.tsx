import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import SelectProvider, { useSelect } from './provider/select-provider';
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

function SelectContent({
  label,
  options,
  isError = false,
  disabled = false,
  className,
  placeholderClassName,
  onChange,
  name,
  defaultValue,
  id,
  ...props
}: SelectProps) {
  const { selectRef } = useSelect();

  return (
    <div ref={selectRef} className={cn('relative cursor-pointer', className)} {...props}>
      <SelectPlaceholder
        id={id}
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
  );
}

export default function Select(props: SelectProps) {
  return (
    <SelectProvider>
      <SelectContent {...props} />
    </SelectProvider>
  );
}
