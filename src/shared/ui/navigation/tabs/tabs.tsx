import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { TabItem } from './ui';
import { TabItemProps } from './ui/tab-item';

export interface TabsProps extends ComponentPropsWithRef<'ul'> {
  items: TabItemProps[];
}

export default function Tabs({ items, className, ...props }: TabsProps) {
  return (
    <nav
      {...props}
      className={cn('flex w-full justify-center gap-0', className)}
    >
      {items.map((item) => (
        <TabItem {...item} key={item.label} />
      ))}
    </nav>
  );
}
