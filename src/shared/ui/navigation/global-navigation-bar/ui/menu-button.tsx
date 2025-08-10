'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
      <AnimatePresence>
        {isOpen && (
          <div className='tablet:hidden'>
            <MenuList
              menus={[
                { label: '홈', href: '/popular' },
                { label: '이모티콘 등록하기', href: '/emoticon-register' },
                { label: '마이 페이지', href: '/my/activity' },
              ]}
            />
            <motion.div
              className='z-index-modal-backdrop absolute top-full right-0 left-0 flex h-screen flex-1 bg-black/50'
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
