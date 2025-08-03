import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Label } from '..';
import { IconProps } from '../../icon/icon';
import { LabelProps } from '../label/label';
import { HelpMessage } from '../part';
import Placeholder from '../placeholder/placeholder';

export const TEXTFIELD_VARIANT = ['default', 'success', 'error'] as const;
export type TextFieldVariant = (typeof TEXTFIELD_VARIANT)[number];

export const TEXTFIELD_DIRECTION = ['row', 'column'] as const;
export type TextFieldDirection = (typeof TEXTFIELD_DIRECTION)[number];

export interface TextFieldProps extends ComponentPropsWithRef<'div'> {
  label: string;
  placeholder: string;
  placeholderIcon?: IconProps['name'];
  placeholderIconSize?: IconProps['size'];
  labelType?: LabelProps['type'];
  variant?: TextFieldVariant;
  disabled?: boolean;
  helpMessage?: Record<TextFieldVariant, string>;
  direction?: TextFieldDirection;
  responsiveDirection?: {
    mobile: TextFieldDirection;
    desktop: TextFieldDirection;
  };
  labelClassName?: string;
  placeholderClassName?: string;
  name?: string;
}

export default function TextField({
  label,
  placeholder,
  placeholderIcon,
  placeholderIconSize,
  labelType = 'default',
  variant = 'default',
  disabled = false,
  helpMessage,
  direction = 'column',
  responsiveDirection,
  className,
  labelClassName,
  placeholderClassName,
  onChange,
  name,
}: TextFieldProps) {
  const finalDirection = responsiveDirection
    ? `${responsiveDirection.mobile} md:${responsiveDirection.desktop}`
    : direction;

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
        <Placeholder
          name={name}
          placeholder={placeholder}
          trailingIcon={placeholderIcon}
          iconSize={placeholderIconSize ?? 24}
          isError={variant === 'error'}
          disabled={disabled ?? false}
          className={placeholderClassName}
          onChange={onChange}
        />
        {helpMessage && (
          <HelpMessage variant={variant}>{helpMessage[variant]}</HelpMessage>
        )}
      </div>
    </div>
  );
}
