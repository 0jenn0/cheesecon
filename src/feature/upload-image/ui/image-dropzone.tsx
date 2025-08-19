'use client';

import Image from 'next/image';
import { ComponentPropsWithRef, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { Spinner } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';
import { useUploadImageToBucketMutation } from '../model/upload-image-mutation';

export interface ImageDropzoneProps extends ComponentPropsWithRef<'div'> {
  maxSize?: number;
  disabled?: boolean;
}

export default function ImageDropzone({
  maxSize = 2, // MB 단위
  disabled = false,
  className,
  ...props
}: ImageDropzoneProps) {
  const addRepresentativeImage = useDraft(
    (store) => store.addRepresentativeImage,
  );
  const representativeImage = useDraft((store) => store.representativeImage);
  const uploadImageMutation = useUploadImageToBucketMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();

        acceptedFiles.forEach((file) => {
          formData.append('file', file);
        });

        const result = await uploadImageMutation.mutateAsync(formData);
        if (result.success) {
          addRepresentativeImage({
            id: crypto.randomUUID(),
            image_url: result.data.url,
            image_order: 0,
            blur_url: result.data.blurUrl ?? null,
            webp_url: result.data.webpUrl ?? null,
            is_representative: true,
          });
          return;
        }
      }
    },
    [uploadImageMutation, addRepresentativeImage],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize: maxSize * 1024 * 1024, // MB를 바이트로 변환
    disabled: disabled || uploadImageMutation.isPending,
    noClick: true,
  });

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        onDrop([files[0]]);
      }
      event.target.value = '';
    },
    [onDrop],
  );

  const isLoading = uploadImageMutation.isPending;
  const isDisabled = disabled || isLoading;

  return (
    <div
      {...getRootProps()}
      className={cn(
        'group tablet:h-full relative flex h-[320px] w-full cursor-pointer flex-col items-center justify-center',
        'padding-24 border-radius-xl border-1 border-dashed transition-all duration-300 ease-in-out',
        isDragActive
          ? 'effect-shadow-16 bg-primary scale-[1.02] border-[var(--color-cheesecon-primary-500)]'
          : 'border-interactive-secondary-subtle bg-interactive-secondary-subtle',
        isDisabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      {...props}
    >
      <input {...getInputProps()} />

      <input
        ref={fileInputRef}
        type='file'
        accept='image/png,image/jpeg,image/gif,image/webp'
        multiple
        onChange={handleFileChange}
        className='hidden'
      />

      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm'>
          <Spinner />
        </div>
      )}

      {representativeImage &&
        (representativeImage.image_url || representativeImage.webp_url) &&
        !isLoading && (
          <div className='group/image border-radius-xl border-ghost effect-shadow-4 bg-primary tablet:h-auto tablet:w-full relative flex aspect-square h-full w-auto items-center justify-center overflow-hidden'>
            <Image
              width={240}
              height={240}
              src={
                representativeImage?.webp_url ??
                representativeImage.image_url ??
                ''
              }
              alt='Uploaded preview'
              className='h-auto w-full object-cover transition-transform duration-300'
            />

            <div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100'>
              <div className='flex flex-col gap-12 text-center text-white'>
                <Icon name='edit' className='mx-auto' size={24} />
                <p className='text-body-md font-medium'>클릭하여 수정</p>
                <p className='text-body-md opacity-90'>새 이미지로 교체</p>
              </div>
            </div>
          </div>
        )}

      {!representativeImage && !isLoading && (
        <div className='padding-24 border-radius-xl bg-primary flex aspect-square h-full w-full flex-col items-center justify-center gap-12 text-center'>
          <div
            className={cn(
              'padding-16 rounded-full transition-all duration-300',
              isDragActive
                ? 'bg-cheesecon-primary-100 text-[var(--color-cheesecon-primary-500)]'
                : 'bg-gray-100/40',
            )}
          >
            <Icon
              name={isDragActive ? 'logo' : 'image-plus'}
              className='icon-disabled'
              size={24}
            />
          </div>

          <h3 className='text-heading-sm flex items-center gap-4'>
            {isDragActive ? '파일을 놓아주세요' : '대표 이미지 업로드'}
            {!isDragActive && <span className='text-red-500'>*</span>}
          </h3>

          {!isDragActive && (
            <div className='flex flex-col gap-12'>
              <p className='text-secondary text-body-sm'>
                파일을 여기에{' '}
                <span className='text-primary font-semibold'>드래그</span>
                하거나
                <br />
                <span className='text-primary font-semibold'>클릭</span>하여
                업로드하세요
              </p>

              <div className='text-body-sm text-tertiary'>
                <p>PNG, JPG, GIF, WEBP 지원</p>
                <p>최대 {maxSize}MB</p>
              </div>

              <div className='mt-16 block'>
                <Button
                  variant='primary'
                  size='sm'
                  onClick={handleFileSelect}
                  disabled={isDisabled}
                  className='w-full'
                >
                  파일 선택
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
