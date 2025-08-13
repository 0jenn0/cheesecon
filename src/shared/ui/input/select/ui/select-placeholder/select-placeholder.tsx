'use client';

import { ComponentPropsWithRef, useCallback, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import Icon, { IconProps } from '@/shared/ui/icon/icon';
import { useSelect } from '../../provider/select-provider';
import { selectPlaceholderVariants } from './select-placeholder.style';

export interface SelectPlaceholderProps
  extends ComponentPropsWithRef<'select'> {
  label: string;
  isError?: boolean;
  disabled?: boolean;
  name?: string;
  placeholder: string;
  selectClassName: string;
  trailingIcon?: IconProps['name'];
  iconClassName?: string;
  iconSize?: IconProps['size'];
  onTrailingIconClick?: () => void;
}

export default function SelectPlaceholder({
  label,
  isError = false,
  disabled = false,
  onClick,
  className,
  onChange,
  name,
  placeholder,
  selectClassName,
  trailingIcon,
  iconClassName,
  iconSize,
  onTrailingIconClick,
  ...props
}: SelectPlaceholderProps) {
  const { currentValue, isOpen, setIsOpen, setCurrentValue } = useSelect();

  const stableOnChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event);
    },
    [onChange],
  );

  useEffect(() => {
    if (onChange && name && currentValue && currentValue !== label) {
      stableOnChange({
        target: {
          name,
          value: currentValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [currentValue, name, label, stableOnChange]);

  const finalVariant = getFinalVariant({
    isError,
    disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLSelectElement>) => {
    if (disabled) return;

    setCurrentValue(currentValue);
    setIsOpen(!isOpen);
    onClick?.(e);
  };

  return (
    <div
      className={cn(
        selectPlaceholderVariants({ variant: finalVariant }),
        className,
      )}
    >
      <div className='relative flex-1'>
        <div className='text-body-sm text-primary disabled:text-disabled pointer-events-none flex flex-1 outline-none'>
          {currentValue || placeholder}
        </div>
        <select
          className={cn(
            'absolute inset-0 h-full w-full cursor-pointer opacity-0',
            selectClassName,
          )}
          value={currentValue}
          onChange={stableOnChange}
          disabled={disabled}
          onClick={handleClick}
          {...props}
        />
      </div>
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
  isError,
  disabled,
}: {
  isError: boolean;
  disabled: boolean;
}) {
  if (disabled) return 'disabled';
  if (isError) return 'error';

  return 'default';
}
