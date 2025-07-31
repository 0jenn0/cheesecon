import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/display/icon/config';
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
    <li {...props} className='flex flex-1'>
      <Link
        href={href}
        className={cn(tabItemVariants({ isActive }), className)}
      >
        {icon && <Icon name={icon} size={16} />}
        {label}
      </Link>
    </li>
  );
}
