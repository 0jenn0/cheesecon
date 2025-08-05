import { ComponentProps, useState } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { likeButtonVariants } from './like-button.style';

export interface LikeButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof likeButtonVariants> {
  likesCount: number;
}

export default function LikeButton({
  likesCount,
  className,
  ...props
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      className={cn(
        likeButtonVariants({ variant: isLiked ? 'filled' : 'default' }),
        className,
      )}
      {...props}
      onClick={handleLike}
    >
      <Icon
        name={isLiked ? 'heart-filled' : 'heart'}
        size={20}
        className={cn(
          isLiked ? 'icon-interactive-inverse' : 'icon-interactive-secondary',
        )}
      />
      {likesCount}
    </button>
  );
}
