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
  return (
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        'text-body-sm',
        textAreaVariants({
          variant: isError ? 'error' : 'default',
        }),
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}
