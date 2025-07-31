import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { TabItem } from './ui';
import { TabItemProps } from './ui/tab-item';

export interface TabsProps extends ComponentPropsWithRef<'ul'> {
  items: TabItemProps[];
}

export default function Tabs({ items, className, ...props }: TabsProps) {
  return (
    <ul {...props} className={cn('flex gap-0', className)}>
      {items.map((item) => (
        <TabItem key={item.label} {...item} />
      ))}
    </ul>
  );
}
