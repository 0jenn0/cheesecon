import { ComponentPropsWithRef, useState } from 'react';
import { i } from 'framer-motion/client';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { IconProps } from '@/shared/ui/icon/icon';
import { Button } from '@/shared/ui/input';
import { useDeleteCommentMutation } from '@/entity/comment/query/comment-mutation';

export interface EditCommentMenuProps extends ComponentPropsWithRef<'ul'> {
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function EditCommentMenu({
  id,
  handleEdit,
  handleDelete,
  className,
  ...props
}: EditCommentMenuProps) {
  const items = [
    {
      label: '수정',
      icon: 'edit-2',
      onClick: () => handleEdit(),
    },
    {
      label: '삭제',
      icon: 'trash',
      onClick: () => handleDelete(),
    },
  ] satisfies { label: string; icon: IconProps['name']; onClick: () => void }[];

  return (
    <ul
      className={cn(
        'padding-x-4 z-index-popover bg-primary border-radius-lg padding-y-4 border-secondary absolute top-full right-0 min-w-[80px] flex-col gap-0 border',
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={`${item.label}-${index}`}
          className={cn(index === 0 && 'border-secondary border-b-[0.6px]')}
        >
          <Button
            variant='secondary'
            styleVariant='transparent'
            size='sm'
            onClick={item.onClick}
            iconSize={16}
            leadingIcon={item.icon}
          >
            {item.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
