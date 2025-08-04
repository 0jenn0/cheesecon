'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/icon/config';
import { tabItemVariants } from './tab-item.style';

export interface TabItemProps extends ComponentPropsWithRef<'li'> {
  label: string;
  href: string;
  icon?: (typeof ICON_NAMES)[number];
  isActive?: boolean;
}

export default function TabItem({
  label,
  href,
  icon,
  isActive: forcedIsActive,
  className,
  ...props
}: TabItemProps) {
  const pathname = usePathname();
  const isActive =
    forcedIsActive !== undefined ? forcedIsActive : pathname === href;

  return (
    <li {...props} className={cn(tabItemVariants({ isActive }), className)}>
      <Link href={href} className='flex w-full items-center justify-center'>
        {icon && <Icon name={icon} size={16} />}
        {label}
      </Link>
    </li>
  );
}
