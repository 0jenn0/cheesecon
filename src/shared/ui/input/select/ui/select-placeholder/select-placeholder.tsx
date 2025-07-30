'use client';

import { ComponentPropsWithRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Icon from '@/shared/ui/display/icon/icon';
import { useSelect } from '../../provider/select-provider';
import { selectPlaceholderVariants } from './select-placeholder.style';

export interface SelectPlaceholderProps extends ComponentPropsWithRef<'div'> {
  label: string;
  isError?: boolean;
  disabled?: boolean;
}

export default function SelectPlaceholder({
  label,
  isError = false,
  disabled = false,
  onClick,
  ...props
}: SelectPlaceholderProps) {
  const { currentValue, isOpen, setIsOpen } = useSelect();

  const finalVariant = getFinalVariant({
    isError,
    disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    setIsOpen(!isOpen);
    onClick?.(e);
  };

  return (
    <div
      className={cn(
        selectPlaceholderVariants({ variant: finalVariant, isOpen }),
      )}
      onClick={handleClick}
      {...props}
    >
      {currentValue || label}
      <Icon
        name='chevron-down'
        size={24}
        className={cn(
          'text-tertiary transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
      />
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
