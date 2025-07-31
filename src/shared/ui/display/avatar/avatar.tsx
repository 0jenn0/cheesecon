'use client';

import { ComponentPropsWithRef, useState } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { Icon } from '..';
import { IconProps } from '../../icon/icon';
import { avatarVariants, letterVariants } from './avatar.style';

export const AVATAR_SIZE = ['sm', 'lg'] as const;
export const PROFILE_TYPE = ['letter', 'image', 'icon'] as const;

export type AvatarSize = (typeof AVATAR_SIZE)[number];
export type ProfileType = (typeof PROFILE_TYPE)[number];

export interface AvatarProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof avatarVariants> {
  name: string;
  imageUrl?: string;
  profileType: ProfileType;
}

export default function Avatar({
  name,
  imageUrl,
  profileType,
  size,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const firstLetter = name ? name[0].toUpperCase() : '';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={cn(avatarVariants({ size }))}>
      {profileType === 'letter' && (
        <span className={letterVariants({ size })}>{firstLetter}</span>
      )}
      {profileType === 'image' && imageUrl && !imageError && (
        <img
          className='h-full w-full object-cover'
          src={imageUrl}
          alt={name}
          onError={handleImageError}
        />
      )}
      {profileType === 'image' && (!imageUrl || imageError) && (
        <span className={letterVariants({ size })}>{firstLetter}</span>
      )}
      {profileType === 'icon' && <Icon name='user' size={getIconSize(size)} />}
    </div>
  );
}

function getIconSize(size: AvatarProps['size']): IconProps['size'] {
  if (size === 'sm') return 16;
  if (size === 'lg') return 48;
}
