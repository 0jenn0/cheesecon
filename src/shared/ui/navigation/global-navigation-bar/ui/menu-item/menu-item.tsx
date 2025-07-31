'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentPropsWithRef, ElementType } from 'react';
import { cn } from '@/shared/lib/utils';
import { menuItemVariants } from './menu-item.style';

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

  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <Component
      {...props}
      href={href}
      className={cn(menuItemVariants({ isSelected }))}
    >
      {label}
    </Component>
  );
}
