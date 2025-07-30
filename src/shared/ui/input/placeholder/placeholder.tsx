import { ComponentPropsWithRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Icon, { IconProps } from '../../display/icon/icon';
import { placeholderVariants } from './placeholder.style';

export interface PlaceholderProps extends ComponentPropsWithRef<'input'> {
  placeholder: string;
  isError: boolean;
  trailingIcon?: IconProps['name'];
  iconClassName?: string;
  inputClassName?: string;
  placeholderClassName?: string;
  iconSize: IconProps['size'];
  disabled: boolean;
  onTrailingIconClick?: () => void;
}

export default function Placeholder({
  placeholder,
  isError = false,
  trailingIcon,
  iconClassName,
  inputClassName,
  placeholderClassName,
  iconSize = 24,
  disabled = false,
  onTrailingIconClick,
  ...props
}: PlaceholderProps) {
  const [value, setValue] = useState('');
  const isFilled = value.length > 0;

  const finalVariant = getFinalVariant({
    isFilled,
    isError,
    disabled,
  });

  return (
    <div
      className={cn(
        placeholderVariants({ variant: finalVariant }),
        placeholderClassName,
      )}
    >
      <input
        {...props}
        className={cn(
          'placeholder:text-tertiary placeholder:text-body-m text-primary disabled:text-disabled flex flex-1 outline-none',
          inputClassName,
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
