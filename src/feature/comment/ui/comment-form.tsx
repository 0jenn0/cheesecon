'use client';

import Image from 'next/image';
import { ComponentPropsWithRef, useCallback, useRef } from 'react';
import { cn } from '@/shared/lib';
import { Avatar } from '@/shared/ui/display';
import { Button, IconButton, TextArea } from '@/shared/ui/input';
import { useGetProfile } from '@/entity/profile/query/profile-query';
import { useAuth } from '@/feature/auth/provider/auth-provider';
import { useCommentItem } from './comment/provider';
import { useCommentForm } from './model';

interface CommentFormProps extends ComponentPropsWithRef<'div'> {
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  commentId?: string;
  parentCommentId?: string;
  initialValue?: string;
}

export default function CommentForm({
  targetId,
  targetType,
  commentId,
  parentCommentId,
  initialValue,
  className,
  ...props
}: CommentFormProps) {
  const {
    handleChange,
    handleUpdateSubmit,
    handleCreateSubmit,
    handleImageUpload,
    handleRemoveImage,
    uploadedImages,
    isPending,
  } = useCommentForm({
    targetId,
    targetType,
    parentCommentId,
    commentId,
  });
  const { isEditing, toggleEditing } = useCommentItem();

  const { data } = useGetProfile();
  const user = data?.success ? data.data : null;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        handleImageUpload(Array.from(files));
      }
      event.target.value = '';
    },
    [handleImageUpload],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isEditing) {
      handleUpdateSubmit(e);
    } else {
      handleCreateSubmit(e);
    }
    toggleEditing();
  };

  return (
    <div className={cn('flex gap-12', className)} {...props}>
      {!isEditing ? (
        <Avatar
          name={user?.nickname ?? ''}
          imageUrl={user?.avatar_url ?? ''}
          profileType='image'
          size='sm'
        />
      ) : null}
      <form
        className='flex w-full flex-col gap-8'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          e.currentTarget.reset();
        }}
      >
        <TextArea
          placeholder={
            user ? '댓글을 입력해주세요.' : '로그인 후 댓글을 작성할 수 있어요.'
          }
          className='flex-1'
          isError={false}
          disabled={!user}
          onChange={handleChange}
          defaultValue={initialValue ?? ''}
        />

        {uploadedImages.length > 0 && (
          <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <p className='text-body-sm text-tertiary'>
                이미지 {uploadedImages.length}/6
              </p>
            </div>
            <div className='flex flex-wrap gap-8'>
              {uploadedImages.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className='border-ghost relative h-[80px] w-[80px] overflow-hidden rounded-lg border'
                >
                  <Image
                    src={imageUrl}
                    alt='uploaded image'
                    fill
                    className='object-cover'
                  />
                  <div className='absolute top-2 right-2'>
                    <IconButton
                      variant='danger'
                      type='button'
                      styleVariant='transparent'
                      className='border-radius-rounded'
                      iconClassName='icon-interactive-primary'
                      icon='trash'
                      iconSize={12}
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='flex w-full justify-end gap-0'>
          <IconButton
            variant='secondary'
            type='button'
            styleVariant='transparent'
            className='aspect-square h-full'
            iconClassName='icon-interactive-secondary'
            icon='image'
            iconSize={24}
            onClick={handleFileSelect}
            disabled={isPending || uploadedImages.length >= 6 || !user}
          />
          <input
            ref={fileInputRef}
            type='file'
            accept='image/png,image/jpeg,image/gif,image/webp'
            multiple
            onChange={handleFileChange}
            disabled={!user || isPending || uploadedImages.length >= 6}
            className='hidden'
          />
          <Button
            className='h-full w-full'
            variant='secondary'
            type='submit'
            isLoading={isPending}
            disabled={!user || isPending || uploadedImages.length >= 6}
          >
            <p className='text-secondary text-sm'>
              {isEditing ? '댓글 수정' : '댓글 작성'}
            </p>
          </Button>
        </div>
      </form>
    </div>
  );
}
