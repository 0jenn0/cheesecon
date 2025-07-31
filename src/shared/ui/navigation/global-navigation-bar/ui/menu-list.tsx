import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import MenuItem from './menu-item/menu-item';

type Menu = {
  label: string;
  href: string;
};

export interface MenuListProps extends ComponentPropsWithRef<'ul'> {
  menus: Menu[];
}

export default function MenuList({ menus, ...props }: MenuListProps) {
  const isOpen = true;

  return (
    <ul
      {...props}
      className={cn(
        'z-index-modal bg-primary padding-y-16 border-secondary absolute top-full right-0 left-0 max-h-[300px] w-full flex-col gap-0 overflow-y-auto border-t border-b',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      {menus.map((menu, index) => (
        <MenuItem
          key={`${menu.label}-${index}`}
          label={menu.label}
          href={menu.href}
          as={Link}
        />
      ))}
      <MenuItem label='로그아웃' onClick={() => console.log('로그아웃')} />
      {/* TODO: 로그아웃 기능 추가 */}
    </ul>
  );
}
