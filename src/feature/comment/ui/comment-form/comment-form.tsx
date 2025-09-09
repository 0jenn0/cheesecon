'use client';

import { ComponentPropsWithRef, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/shared/lib';
import { Avatar } from '@/shared/ui/display';
import { Button, IconButton, TextArea } from '@/shared/ui/input';
import { UpdateCommentParams } from '@/entity/comment';
import { useGetProfile } from '@/entity/profile/query/profile-query';
import { useCommentItem } from '../comment/provider';
import { useCommentForm } from '../model';
import { ImageItem } from './ui';

interface CommentFormProps extends ComponentPropsWithRef<'div'> {
  targetId: string;
  targetType: 'emoticon_set' | 'emoticon_image';
  commentId?: string;
  parentCommentId?: string;
  initialValue?: UpdateCommentParams;
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
    setUploadedImages,
    isPending,
  } = useCommentForm({
    targetId,
    targetType,
    parentCommentId,
    commentId,
  });
  const { isEditing, toggleEditing } = useCommentItem();

  useEffect(() => {
    if (isEditing && initialValue?.images) {
      setUploadedImages(initialValue.images);
    }
  }, [isEditing, initialValue?.images, setUploadedImages]);

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
      toggleEditing();
    } else {
      handleCreateSubmit(e);
    }
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
          defaultValue={initialValue?.content ?? ''}
        />

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
            accept='image/png,image/jpeg,image/gif,image/webp,image/heic,image/heif'
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

        {!isEditing && uploadedImages.length > 0 && (
          <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <p className='text-body-sm text-tertiary'>
                이미지 {uploadedImages.length}/6
              </p>
            </div>
            <div className='flex flex-wrap gap-8'>
              {uploadedImages.map((imageUrl, index) => (
                <ImageItem
                  key={imageUrl}
                  imageUrl={imageUrl}
                  index={index}
                  handleRemoveImage={handleRemoveImage}
                />
              ))}
            </div>
          </div>
        )}

        {isEditing &&
          initialValue?.images &&
          initialValue?.images.length > 0 && (
            <div className='flex flex-col gap-8'>
              <div className='flex items-center justify-between'>
                <p className='text-body-sm text-tertiary'>
                  이미지 {uploadedImages.length}/6
                </p>
              </div>
              <div className='flex flex-wrap gap-8'>
                {uploadedImages.map((imageUrl, index) => (
                  <ImageItem
                    key={imageUrl}
                    imageUrl={imageUrl}
                    index={index}
                    handleRemoveImage={handleRemoveImage}
                  />
                ))}
              </div>
            </div>
          )}
      </form>
    </div>
  );
}
