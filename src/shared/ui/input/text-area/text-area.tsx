import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { textAreaVariants } from './tex-area.style';

export interface TextAreaProps extends ComponentPropsWithRef<'textarea'> {
  placeholder: string;
  isError: boolean;
  disabled: boolean;
}

export default function TextArea({
  placeholder,
  isError = false,
  disabled = false,
  className,
  onChange,
  ...props
}: TextAreaProps) {
  const variant = isError ? 'error' : disabled ? 'disabled' : 'default';
  return (
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        'text-[16px]',
        textAreaVariants({
          variant,
        }),
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}
