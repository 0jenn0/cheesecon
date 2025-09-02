'use client';

import { ComponentPropsWithRef, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';
import Icon, { IconProps } from '../../icon/icon';
import { placeholderVariants } from './placeholder.style';

export interface PlaceholderProps extends ComponentPropsWithRef<'input'> {
  placeholder: string;
  isError: boolean;
  trailingIcon?: IconProps['name'];
  iconClassName?: string;
  inputClassName?: string;
  iconSize?: IconProps['size'];
  disabled: boolean;
  onTrailingIconClick?: () => void;
}

export default function Placeholder({
  placeholder,
  isError = false,
  trailingIcon,
  iconClassName,
  inputClassName,
  iconSize = 24,
  disabled = false,
  onTrailingIconClick,
  className,
  onChange,
  ...props
}: PlaceholderProps) {
  const [value, setValue] = useState(props.defaultValue || '');

  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue !== null) {
      setValue(String(props.defaultValue));
    }
  }, [props.defaultValue]);

  const isFilled = !!value;

  const finalVariant = getFinalVariant({
    isFilled,
    isError,
    disabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      className={cn(placeholderVariants({ variant: finalVariant }), className)}
    >
      <input
        {...props}
        className={cn(
          'text-primary disabled:text-disabled flex min-w-0 flex-1 text-[16px] outline-none',
          inputClassName,
        )}
        placeholder={placeholder}
        value={typeof value === 'string' ? value : ''}
        onChange={handleChange}
        disabled={disabled}
      />
      {trailingIcon && (
        <button
          type='button'
          disabled={disabled}
          onClick={() => {
            if (onTrailingIconClick) {
              onTrailingIconClick();
            }
          }}
        >
          <Icon
            name={trailingIcon}
            className={cn('text-tertiary', iconClassName)}
            size={iconSize}
          />
        </button>
      )}
    </div>
  );
}

function getFinalVariant({
  isFilled,
  isError,
  disabled,
}: {
  isFilled: boolean;
  isError: boolean;
  disabled: boolean;
}) {
  if (disabled) return 'disabled';
  if (isError) return 'error';
  if (isFilled) return 'filled';
  return 'default';
}
