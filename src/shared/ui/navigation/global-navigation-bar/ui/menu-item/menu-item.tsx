import { ComponentPropsWithRef, ElementType } from 'react';

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

type PolymorphicComponentProp<T extends ElementType, Props = {}> = {
  as?: T;
  ref?: PolymorphicRef<T>;
} & Props &
  Omit<ComponentPropsWithRef<T>, keyof Props | 'as' | 'ref'>;

export interface MenuItemProps {
  label: string;
  href?: string;
}

export type PolymorphicButtonProps<T extends ElementType = 'button'> =
  PolymorphicComponentProp<T, MenuItemProps>;

export default function MenuItem<T extends ElementType = 'button'>({
  label,
  href,
  as,
  ...props
}: PolymorphicButtonProps<T>) {
  const Component = as || 'button';

  return (
    <Component
      {...props}
      href={href}
      className='text-body-md bg-interactive-secondary-subtle padding-x-16 padding-y-8 flex cursor-pointer items-center gap-4 select-none'
    >
      {label}
    </Component>
  );
}
