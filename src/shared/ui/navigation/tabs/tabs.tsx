'use client';

import { ComponentPropsWithRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { TabItem } from './ui';
import { TabItemProps } from './ui/tab-item';

export interface TabsProps extends ComponentPropsWithRef<'ul'> {
  items: TabItemProps[];
}

export default function Tabs({ items, className, ...props }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [borderPosition, setBorderPosition] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeTabIndex = items.findIndex((item) => item.isActive);
    if (activeTabIndex !== -1) {
      setActiveIndex(activeTabIndex);
    }
  }, [items]);

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      const { offsetLeft, offsetWidth } = activeTab;
      setBorderPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex]);

  return (
    <nav
      {...props}
      className={cn('relative flex w-full justify-center gap-0', className)}
    >
      {items.map((item, index) => (
        <TabItem
          {...item}
          key={item.label}
          onClick={() => setActiveIndex(index)}
        />
      ))}
      <motion.div
        className='bg-interactive-primary absolute bottom-0 h-[2px]'
        initial={false}
        animate={{
          left: borderPosition.left,
          width: borderPosition.width,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </nav>
  );
}
