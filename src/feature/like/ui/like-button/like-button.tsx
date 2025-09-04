'use client';

import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import { useLikeCount } from '@/entity/like/query';
import { useOptimisticLike } from '@/entity/like/query/like-mutation-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { trackEvent } from '@/shared/lib/amplitude';
import { likeButtonVariants } from './like-button.style';

export interface LikeButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof likeButtonVariants> {
  targetType: 'emoticon_set' | 'emoticon_image';
  targetId: string;
  initialLikesCount?: number;
}

export default function LikeButton({
  targetType,
  targetId,
  initialLikesCount,
  className,
  ...props
}: LikeButtonProps) {
  const { data: initialLikesCountReplaced } = useLikeCount(
    targetType,
    targetId,
  );

  const { session } = useAuth();
  const { isLiked, likesCount, isLoading, toggleLike } = useOptimisticLike(
    targetType,
    targetId,
    session?.user.id,
    initialLikesCount ?? initialLikesCountReplaced ?? 0,
  );

  const handleToggleLike = () => {
    trackEvent('like_toggle', {
      targetType,
      targetId,
      action: isLiked ? 'unlike' : 'like',
    });
    toggleLike();
  };

  return (
    <button
      className={cn(
        likeButtonVariants({ variant: isLiked ? 'filled' : 'default' }),
        className,
      )}
      onClick={handleToggleLike}
      disabled={isLoading}
      {...props}
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
