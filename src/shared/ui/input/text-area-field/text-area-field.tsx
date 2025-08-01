import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Label } from '..';
import { IconProps } from '../../icon/icon';
import { LabelProps } from '../label/label';
import { HelpMessage } from '../part';
import TextArea from '../text-area/text-area';

export const TEXTFIELD_VARIANT = ['default', 'success', 'error'] as const;
export type TextFieldVariant = (typeof TEXTFIELD_VARIANT)[number];

export const TEXTFIELD_DIRECTION = ['row', 'column'] as const;
export type TextFieldDirection = (typeof TEXTFIELD_DIRECTION)[number];

export interface TextAreaFieldProps extends ComponentPropsWithRef<'div'> {
  label: string;
  placeholder: string;
  placeholderIcon?: IconProps['name'];
  placeholderIconSize?: IconProps['size'];
  variant?: TextFieldVariant;
  disabled?: boolean;
  helpMessage?: Record<TextFieldVariant, string>;
  direction?: TextFieldDirection;
  labelType?: LabelProps['type'];
  labelClassName?: string;
  textAreaClassName?: string;
}

export default function TextAreaField({
  label,
  placeholder,
  variant = 'default',
  disabled = false,
  helpMessage,
  direction = 'column',
  labelType = 'default',
  className,
  labelClassName,
  textAreaClassName,
}: TextAreaFieldProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-12',
        direction === 'row' && 'flex-row items-start',
        className,
      )}
    >
      <Label type={labelType} className={labelClassName}>
        {label}
      </Label>
      <div className='flex flex-1 flex-col gap-8'>
        <TextArea
          placeholder={placeholder}
          isError={variant === 'error'}
          disabled={disabled ?? false}
          className={textAreaClassName}
        />
        {helpMessage && (
          <HelpMessage variant={variant}>{helpMessage[variant]}</HelpMessage>
        )}
      </div>
    </div>
  );
}
