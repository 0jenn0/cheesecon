'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import MenuItem from './menu-item/menu-item';

type Menu = {
  label: string;
  href: string;
  onClick?: () => void;
};

export interface MenuListProps extends ComponentPropsWithRef<'ul'> {
  menus: Menu[];
  onClick?: () => void;
}

export default function MenuList({ menus, onClick, ...props }: MenuListProps) {
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

  return (
    <motion.ul
      initial={{ scaleY: 0.8 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn(
        'z-index-modal bg-primary padding-y-16 border-secondary absolute top-full right-0 left-0 flex max-h-[300px] w-full flex-col gap-0 overflow-y-auto border-t border-b',
        props.className,
      )}
      style={{ ...props.style, transformOrigin: 'top' }}
      id={props.id}
    >
      {menus.map((menu, index) => (
        <li
          key={`${menu.label}-${index}`}
          className='cursor-pointer'
          onClick={onClick}
        >
          <MenuItem label={menu.label} href={menu.href} as={Link} />
        </li>
      ))}
      <li className='cursor-pointer'>
        <MenuItem
          label={isLoggedIn ? '로그아웃' : '로그인'}
          onClick={handleLogout}
        />
      </li>
    </motion.ul>
  );
}
