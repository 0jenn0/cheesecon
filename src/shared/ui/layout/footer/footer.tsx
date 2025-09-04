'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/shared/ui/display';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className='bg-secondary border-ghost padding-y-16 padding-x-16 m-auto flex w-full max-w-[1024px] items-center justify-between border-t'>
      <div className='flex items-center gap-8'>
        <Icon
          name='logo'
          size={24}
          className='text-[var(--color-cheesecon-primary-400)]'
        />
        <span className='text-body-md text-primary'>cheesecon</span>
      </div>

      <div className='text-center'>
        <p className='text-body-sm text-tertiary'>© {currentYear} CheeseCon</p>
      </div>

      <div className='tablet:flex hidden'>
        <a
          href='mailto:cheesecon2025@gmail.com'
          className='text-body-sm text-interactive-secondary hover:text-interactive-secondary-hovered transition-colors'
        >
          문의 | cheesecon2025@gmail.com
        </a>
      </div>
    </footer>
  );
}
