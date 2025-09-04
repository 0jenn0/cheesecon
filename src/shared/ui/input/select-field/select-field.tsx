import { ComponentPropsWithRef, useId } from 'react';
import { cn } from '@/shared/lib';
import { Label, Select } from '..';
import { IconProps } from '../../icon/icon';
import { LabelProps } from '../label/label';
import { HelpMessage } from '../part';

export const SELECT_VARIANT = ['default', 'success', 'error'] as const;
export type SelectVariant = (typeof SELECT_VARIANT)[number];

export const SELECT_DIRECTION = ['row', 'column'] as const;
export type SelectDirection = (typeof SELECT_DIRECTION)[number];

export interface TextFieldProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  label?: string;
  placeholder: string;
  placeholderIcon?: IconProps['name'];
  placeholderIconSize?: IconProps['size'];
  labelType?: LabelProps['type'];
  variant?: SelectVariant;
  disabled?: boolean;
  helpMessage?: Record<SelectVariant, string>;
  direction?: SelectDirection;
  responsiveDirection?: {
    mobile: SelectDirection;
    desktop: SelectDirection;
  };
  options: string[];
  labelClassName?: string;
  selectClassName?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
}

export default function SelectField({
  label,
  placeholder,
  labelType = 'default',
  variant = 'default',
  disabled = false,
  helpMessage,
  direction = 'column',
  responsiveDirection,
  options,
  className,
  labelClassName,
  selectClassName,
  onChange,
  name,
  defaultValue,
}: TextFieldProps) {
  const selectId = useId();

  return (
    <div
      className={cn(
        'group flex flex-col gap-12',
        direction === 'row' && 'flex-row items-start',
        responsiveDirection &&
          `flex-${responsiveDirection.mobile} md:flex-${responsiveDirection.desktop} items-start`,
        className,
      )}
    >
      {label && (
        <Label type={labelType} className={labelClassName} htmlFor={selectId}>
          {label}
        </Label>
      )}
      <div className='flex w-full flex-1 flex-col gap-8'>
        <Select
          id={selectId}
          name={name}
          label={placeholder}
          disabled={disabled}
          options={options}
          placeholderClassName={selectClassName}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        {helpMessage && (
          <HelpMessage variant={variant}>{helpMessage[variant]}</HelpMessage>
        )}
      </div>
    </div>
  );
}
