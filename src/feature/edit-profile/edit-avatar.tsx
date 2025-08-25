'use client';

import { ComponentPropsWithRef, useRef, useState } from 'react';
import { cn } from '@/shared/lib';
import { Avatar, Icon } from '@/shared/ui/display';
import Spinner from '@/shared/ui/feedback/spinner/spinner';
import { Profile } from '@/entity/profile';
import { useUploadImageToBucketMutation } from '../upload-image/model/upload-image-mutation';

interface EditAvatarProps extends ComponentPropsWithRef<'div'> {
  profile: Profile;
  onImageUpload: (imageUrl: string) => void;
}

export default function EditAvatar({
  className,
  profile,
  onImageUpload,
  ...props
}: EditAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImageMutation, isPending } =
    useUploadImageToBucketMutation();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadImageMutation(formData);
      if (result.success) {
        setImageUrl(result.data.url);
        onImageUpload(result.data.url);
      }
    }
  };

  return (
    <div
      className={cn(
        'border-radius-rounded relative overflow-hidden',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Avatar
        name={profile.nickname}
        profileType={profile.avatar_url ? 'image' : 'letter'}
        size='lg'
        imageUrl={imageUrl || profile.avatar_url || ''}
      />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/png,image/jpeg,image/gif,image/webp,image/heic,image/heif'
        multiple
        onChange={handleFileChange}
        className='hidden'
      />
      <div className='group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/30'>
        {isPending ? (
          <Spinner variant='white' />
        ) : (
          <Icon
            name='image-plus'
            size={16}
            className='icon-interactive-inverse opacity-50 transition-all duration-100 group-hover:scale-110 group-hover:opacity-100'
          />
        )}
      </div>
    </div>
  );
}
