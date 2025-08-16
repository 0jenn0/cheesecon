import { ComponentPropsWithRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { useModal } from '@/shared/ui/feedback';
import { IconProps } from '@/shared/ui/icon/icon';
import { Button } from '@/shared/ui/input';
import { useCommentSectionUi } from '@/feature/comment/ui/emoticon-comment-section/provider/use-comment-section-ui';
import { useCommentItem } from './comment/provider';

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
}: ComponentPropsWithRef<typeof motion.ul> & { id: string }) {
  const { toggleMore, isShowingMore } = useCommentSectionUi(id);
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
    <AnimatePresence mode='wait'>
      {isShowingMore && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
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
                  if (item.label === '수정') {
                    handleEdit();
                  } else if (item.label === '삭제') {
                    handleDelete();
                  }
                }}
                iconSize={16}
                leadingIcon={item.icon}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
