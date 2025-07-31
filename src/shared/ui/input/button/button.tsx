import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { Spinner } from '../../feedback';
import { SpinnerProps } from '../../feedback/spinner/spinner';
import { ICON_NAMES } from '../../icon/config';
import Icon from '../../icon/icon';
import { buttonVariants, iconVariants, textVariants } from './button.styles';

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

type PolymorphicComponentProp<T extends ElementType, Props = {}> = {
  as?: T;
  ref?: PolymorphicRef<T>;
} & Props &
  Omit<ComponentPropsWithRef<T>, keyof Props | 'as' | 'ref'>;

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  leadingIcon?: (typeof ICON_NAMES)[number];
  trailingIcon?: (typeof ICON_NAMES)[number];
  isLoading?: boolean;
  textClassName?: string;
}

export type PolymorphicButtonProps<T extends ElementType = 'button'> =
  PolymorphicComponentProp<T, ButtonProps>;

export default function Button<T extends ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  size = 'md',
  styleVariant = 'filled',
  leadingIcon,
  trailingIcon,
  isLoading = false,
  disabled,
  className,
  textClassName,
  ...props
}: PolymorphicButtonProps<T>) {
  const Component = as || 'button';
  const finalVariant = disabled ? 'disabled' : variant;
  const spinnerConfig = getSpinnerAllVariant(size, variant, styleVariant);
  const opacity = isLoading && 'opacity-0';

  const isButton = Component === 'button';
  const buttonProps = isButton ? { disabled } : {};
  const disabledClass = !isButton && disabled ? 'pointer-events-none' : '';

  return (
    <Component
      className={cn(
        buttonVariants({ variant: finalVariant, size, styleVariant }),
        disabledClass,
        className,
      )}
      {...buttonProps}
      {...props}
    >
      {isLoading && (
        <Spinner
          size={spinnerConfig.size}
          variant={spinnerConfig.variant}
          className='absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
        />
      )}
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          className={cn(
            iconVariants({ size, variant: finalVariant, styleVariant }),
            opacity,
          )}
        />
      )}
      <div
        className={cn(
          textVariants({ variant: finalVariant, styleVariant }),
          opacity,
          textClassName,
        )}
      >
        {children}
      </div>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          className={cn(
            iconVariants({ size, variant: finalVariant, styleVariant }),
            opacity,
          )}
        />
      )}
    </Component>
  );
}

export function getSpinnerSize(
  size: ButtonProps['size'],
): SpinnerProps['size'] {
  if (size === 'sm') {
    return 'sm';
  }

  if (size === 'md') {
    return 'md';
  }

  return 'lg';
}

export function getSpinnerVariant(
  variant: ButtonProps['variant'],
  styleVariant: ButtonProps['styleVariant'],
): SpinnerProps['variant'] {
  if (variant === 'primary' || variant === 'secondary') {
    return 'secondary';
  }

  if (variant === 'danger' && styleVariant !== 'filled') {
    return 'danger';
  }

  return 'white';
}

function getSpinnerAllVariant(
  size: ButtonProps['size'],
  variant: ButtonProps['variant'],
  styleVariant: ButtonProps['styleVariant'],
) {
  return {
    size: getSpinnerSize(size),
    variant: getSpinnerVariant(variant, styleVariant),
  };
}
