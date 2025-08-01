import { ComponentPropsWithRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { Spinner } from '../../feedback';
import { ICON_NAMES } from '../../icon/config';
import Icon from '../../icon/icon';
import { getSpinnerSize, getSpinnerVariant } from '../button/button';
import {
  iconButtonIconVariants,
  iconButtonVariants,
} from './icon-button.styles';

export interface IconButtonProps
  extends ComponentPropsWithRef<'button'>,
    VariantProps<typeof iconButtonVariants> {
  icon: (typeof ICON_NAMES)[number];
  isLoading?: boolean;
}

export default function IconButton({
  icon,
  variant = 'primary',
  styleVariant = 'filled',
  disabled,
  isLoading = false,
  className,
  ...props
}: IconButtonProps) {
  const finalVariant = disabled ? 'disabled' : variant;
  const opacity = isLoading && 'opacity-0';

  return (
    <button
      className={cn(
        iconButtonVariants({ variant: finalVariant, styleVariant }),
        className,
      )}
      {...props}
    >
      {isLoading && (
        <Spinner
          size={getSpinnerSize('sm')}
          variant={getSpinnerVariant(variant, styleVariant)}
          className='absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
        />
      )}
      <Icon
        name={icon}
        className={cn(
          iconButtonIconVariants({
            variant: finalVariant,
            styleVariant,
          }),
          opacity,
        )}
      />
    </button>
  );
}
