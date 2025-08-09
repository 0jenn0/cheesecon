import { ComponentPropsWithRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/ui/feedback/modal';
import { IconProps } from '@/shared/ui/icon/icon';
import { Button } from '@/shared/ui/input';
import { useDeleteCommentMutation } from '@/entity/comment/query/comment-mutation';
import { useCommentSectionUi } from '@/feature/comment/ui/emoticon-comment-section/provider/use-comment-section-ui';
import { useCommentItem } from './comment/provider';

export interface EditCommentMenuProps extends ComponentPropsWithRef<'ul'> {}

const items = [
  {
    label: '수정',
    icon: 'edit-2',
  },
  {
    label: '삭제',
    icon: 'trash',
  },
] satisfies { label: string; icon: IconProps['name'] }[];

export default function EditCommentMenu({
  id,
  className,
  ...props
}: EditCommentMenuProps) {
  const { toggleMore } = useCommentSectionUi(id ?? '');
  const { toggleEditing, commentId } = useCommentItem();
  const { openModal } = useModal();

  const handleEdit = () => {
    toggleMore();
    toggleEditing();
  };

  const handleDelete = () => {
    toggleMore();
    openModal('deleteComment', {
      commentId,
    });
  };

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
            onClick={() => {
              item.label === '수정' && handleEdit();
              item.label === '삭제' && handleDelete();
            }}
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
