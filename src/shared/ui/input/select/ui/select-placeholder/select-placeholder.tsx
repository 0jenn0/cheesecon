'use client';

import { ComponentPropsWithRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Icon from '@/shared/ui/icon/icon';
import Placeholder from '../../../placeholder/placeholder';
import { useSelect } from '../../provider/select-provider';
import { selectPlaceholderVariants } from './select-placeholder.style';

export interface SelectPlaceholderProps extends ComponentPropsWithRef<'input'> {
  label: string;
  isError?: boolean;
  disabled?: boolean;
  name?: string;
}

export default function SelectPlaceholder({
  label,
  isError = false,
  disabled = false,
  onClick,
  className,
  onChange,
  name,
}: SelectPlaceholderProps) {
  const { currentValue, isOpen, setIsOpen } = useSelect();

  const finalVariant = getFinalVariant({
    isError,
    disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (disabled) return;

    setIsOpen(!isOpen);
    onClick?.(e);

    if (onChange) {
      onChange({
        target: {
          name,
          value: currentValue || label,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Placeholder
      name={name}
      placeholder={currentValue || label}
      isError={isError}
      disabled={disabled}
      iconSize={20}
      trailingIcon='chevron-down'
      onChange={onChange}
      className={cn(
        selectPlaceholderVariants({ variant: finalVariant, isOpen }),
        className,
      )}
      onClick={handleClick}
      readOnly
      inputClassName='cursor-pointer placeholder-text-primary'
    />
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
