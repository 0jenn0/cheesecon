import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { Label } from '..';
import { IconProps } from '../../display/icon/icon';
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
  variant?: TextFieldVariant;
  disabled?: boolean;
  helpMessage?: Record<TextFieldVariant, string>;
  direction?: TextFieldDirection;
}

export default function TextField({
  label,
  placeholder,
  placeholderIcon,
  placeholderIconSize,
  variant = 'default',
  disabled = false,
  helpMessage,
  direction = 'column',
}: TextFieldProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-12',
        direction === 'row' && 'flex-row items-start',
      )}
    >
      <Label>{label}</Label>
      <div className='flex flex-1 flex-col gap-8'>
        <Placeholder
          placeholder={placeholder}
          trailingIcon={placeholderIcon}
          iconSize={placeholderIconSize ?? 24}
          isError={variant === 'error'}
          disabled={disabled ?? false}
        />
        {helpMessage && (
          <HelpMessage variant={variant}>{helpMessage[variant]}</HelpMessage>
        )}
      </div>
    </div>
  );
}
