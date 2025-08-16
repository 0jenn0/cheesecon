'use client';

import { ComponentPropsWithRef, useCallback, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import Icon, { IconProps } from '@/shared/ui/icon/icon';
import { useSelect } from '../../provider/select-provider';
import { selectPlaceholderVariants } from './select-placeholder.style';

export interface SelectPlaceholderProps
  extends Omit<ComponentPropsWithRef<'button'>, 'onChange'> {
  label: string;
  isError?: boolean;
  disabled?: boolean;
  name?: string;
  placeholder: string;
  selectClassName?: string;
  trailingIcon?: IconProps['name'];
  iconClassName?: string;
  iconSize?: IconProps['size'];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  }, [currentValue, name, label, stableOnChange, onChange]);

  const finalVariant = getFinalVariant({
    isError,
    disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    setCurrentValue(currentValue);
    setIsOpen(!isOpen);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setCurrentValue(currentValue);
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      className={cn(
        selectPlaceholderVariants({ variant: finalVariant }),
        className,
      )}
    >
      <div className='relative z-20 w-full'>
        <button
          type='button'
          role='combobox'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-labelledby={`${name || 'select'}-label`}
          aria-describedby={`${name || 'select'}-description`}
          className={cn(
            'text-primary disabled:text-disabled w-full text-left focus:outline-none',
            selectClassName,
          )}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <span className='text-body-md block truncate'>
            {currentValue || placeholder}
          </span>
        </button>

        <select
          name={name}
          value={currentValue}
          onChange={stableOnChange}
          disabled={disabled}
          className='sr-only'
          aria-hidden='true'
        >
          <option value=''>{placeholder}</option>
        </select>

        {trailingIcon && (
          <div className='pointer-events-none absolute top-1/2 right-4 z-10 -translate-y-1/2'>
            <Icon
              name={trailingIcon}
              className={cn('text-tertiary', iconClassName)}
              size={iconSize}
            />
          </div>
        )}
      </div>

      <div className='sr-only'>
        <span id={`${name || 'select'}-label`}>{label}</span>
        <span id={`${name || 'select'}-description`}>
          {isOpen
            ? '드롭다운이 열려있습니다. 화살표 키로 옵션을 탐색하고 Enter로 선택하세요.'
            : '드롭다운을 열려면 Enter를 누르세요.'}
        </span>
      </div>
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
