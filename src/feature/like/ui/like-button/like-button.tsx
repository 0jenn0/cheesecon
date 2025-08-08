'use client';

import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { useOptimisticLike } from '@/entity/like/query/like-mutation-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { likeButtonVariants } from './like-button.style';

export interface LikeButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof likeButtonVariants> {
  setId: string;
  initialLikesCount: number;
}

export default function LikeButton({
  setId,
  initialLikesCount,
  className,
  ...props
}: LikeButtonProps) {
  const { session } = useAuth();
  const { isLiked, likesCount, isLoading, toggleLike } = useOptimisticLike(
    setId,
    session?.user.id,
    initialLikesCount,
  );

  return (
    <button
      className={cn(
        likeButtonVariants({ variant: isLiked ? 'filled' : 'default' }),
        className,
      )}
      {...props}
      onClick={toggleLike}
      disabled={isLoading}
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
