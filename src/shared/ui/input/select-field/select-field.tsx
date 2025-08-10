import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Label, Select } from '..';
import { IconProps } from '../../icon/icon';
import { LabelProps } from '../label/label';
import { HelpMessage } from '../part';

export const SELECT_VARIANT = ['default', 'success', 'error'] as const;
export type SelectVariant = (typeof SELECT_VARIANT)[number];

export const SELECT_DIRECTION = ['row', 'column'] as const;
export type SelectDirection = (typeof SELECT_DIRECTION)[number];

export interface TextFieldProps extends ComponentPropsWithRef<'div'> {
  label: string;
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
}

export default function SelectField({
  label,
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
}: TextFieldProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-12',
        direction === 'row' && 'flex-row items-start',
        responsiveDirection &&
          `flex-${responsiveDirection.mobile} md:flex-${responsiveDirection.desktop} items-start`,
        className,
      )}
    >
      <Label type={labelType} className={labelClassName}>
        {label}
      </Label>
      <div className='flex w-full flex-1 flex-col gap-8'>
        <Select
          name={name}
          label='이모티콘 플랫폼'
          disabled={disabled}
          options={options}
          placeholderClassName={selectClassName}
          onChange={onChange}
        />
        {helpMessage && (
          <HelpMessage variant={variant}>{helpMessage[variant]}</HelpMessage>
        )}
      </div>
    </div>
  );
}
