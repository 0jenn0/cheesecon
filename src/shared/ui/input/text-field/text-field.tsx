import { ComponentPropsWithRef, useId } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
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

const textFieldVariants = cva('flex w-full', {
  variants: {
    direction: {
      column: 'flex-col gap-12',
      row: 'tablet:flex-row flex-row gap-12',
    },
  },
});

export interface TextFieldProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof textFieldVariants> {
  label: string;
  placeholder: string;
  placeholderIcon?: IconProps['name'];
  placeholderIconSize?: IconProps['size'];
  labelType?: LabelProps['type'];
  variant?: TextFieldVariant;
  disabled?: boolean;
  helpMessage?: Record<TextFieldVariant, string>;
  direction?: TextFieldDirection;
  labelClassName?: string;
  placeholderClassName?: string;
  name?: string;
  inputProps?: ComponentPropsWithRef<'input'>;
  defaultValue?: string;
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
  direction,
  labelClassName,
  placeholderClassName,
  onChange,
  name,
  inputProps,
}: TextFieldProps) {
  const id = useId();
  const inputId = name || id;

  return (
    <div
      className={cn(
        direction
          ? textFieldVariants({ direction })
          : 'tablet:flex-row flex flex-col gap-12',
      )}
    >
      <Label type={labelType} className={labelClassName} htmlFor={inputId}>
        {label}
      </Label>
      <div className='flex w-full flex-1 flex-col gap-8'>
        <Placeholder
          id={inputId}
          name={name}
          placeholder={placeholder}
          trailingIcon={placeholderIcon}
          iconSize={placeholderIconSize ?? 24}
          isError={variant === 'error'}
          disabled={disabled ?? false}
          className={placeholderClassName}
          onChange={onChange}
          {...inputProps}
        />
        {helpMessage && (
          <HelpMessage variant={variant}>{helpMessage[variant]}</HelpMessage>
        )}
      </div>
    </div>
  );
}
