'use client';

import { useEffect, useState } from 'react';
import { IconButton } from '@/shared/ui/input';
import { MenuList } from '.';

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <IconButton
        icon='menu'
        variant='secondary'
        styleVariant='transparent'
        className='tablet:hidden flex'
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className='tablet:hidden'>
          <MenuList
            menus={[
              { label: '홈', href: '/' },
              { label: '이모티콘 등록하기', href: '/emoticon-register' },
              { label: '마이 페이지', href: '/my-page' },
            ]}
          />
          <div className='z-index-modal-backdrop absolute top-full right-0 left-0 flex h-screen flex-1 bg-black/50' />
        </div>
      )}
    </>
  );
}
