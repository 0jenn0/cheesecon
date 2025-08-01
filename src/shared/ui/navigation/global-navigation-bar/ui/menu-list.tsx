'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import MenuItem from './menu-item/menu-item';

type Menu = {
  label: string;
  href: string;
};

export interface MenuListProps extends ComponentPropsWithRef<'ul'> {
  menus: Menu[];
}

export default function MenuList({ menus, ...props }: MenuListProps) {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();

  const isLoggedIn = !isLoading && user !== null && user.email !== '';

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      handleSignOut();
    } else {
      handleSignIn();
    }
  };

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
      <MenuItem
        label={isLoggedIn ? '로그아웃' : '로그인'}
        onClick={handleLogout}
      />
    </ul>
  );
}
