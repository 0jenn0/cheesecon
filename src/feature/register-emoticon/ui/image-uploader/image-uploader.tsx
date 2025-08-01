'use client';

import { ComponentPropsWithRef, useCallback, useState } from 'react';
import { cn } from '@/shared/lib';
import Icon from '@/shared/ui/icon/icon';
import { Button } from '@/shared/ui/input';

export interface ImageUploaderProps extends ComponentPropsWithRef<'div'> {
  onImageSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number; // MB 단위
  disabled?: boolean;
}

export default function ImageUploader({
  onImageSelect,
  accept = 'image/*',
  maxSize = 10, // 10MB
  disabled = false,
  className,
  ...props
}: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        return '이미지 파일만 업로드 가능합니다.';
      }

      // 파일 크기 검증 (MB 단위)
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSize) {
        return `파일 크기는 ${maxSize}MB 이하여야 합니다.`;
      }

      return null;
    },
    [maxSize],
  );

  const handleFileSelect = useCallback(
    (file: File) => {
      setError(null);

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile(file);

      // 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      onImageSelect?.(file);
    },
    [validateFile, onImageSelect],
  );

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [disabled, handleFileSelect],
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          handleFileSelect(file);
        }
      };
      input.click();
    }
  }, [disabled, accept, handleFileSelect]);

  const handleRemove = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  return (
    <div
      className={cn(
        'border-radius-xl border-secondary bg-secondary flex h-full min-w-[240px] items-center border border-dashed',
        className,
      )}
      {...props}
    >
      {!selectedFile ? (
        <div
          className={cn(
            'border-primary flex aspect-square w-full cursor-pointer items-center justify-center bg-white/80 text-center transition-colors',
            isDragOver &&
              'border-interactive-primary bg-interactive-primary-subtle',
            !isDragOver && 'border-tertiary hover:border-interactive-secondary',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className='flex flex-col items-center gap-24'>
            <Icon name='image-plus' size={32} className='icon-ghost' />
            <div className='flex flex-col gap-8'>
              <p className='text-body-sm text-secondary'>
                대표 이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className='text-body-sm text-tertiary'>
                {accept === 'image/*' ? '이미지 파일' : accept} • 최대 {maxSize}
                MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='border-primary relative flex aspect-square w-full cursor-pointer items-center justify-center bg-white/80 text-center transition-colors'>
          <div className='aspect-square w-full overflow-hidden'>
            <img
              src={previewUrl!}
              alt='업로드된 이미지'
              className='h-full w-full object-cover'
            />
            <div className='absolute inset-0 bg-black/0 transition-colors hover:bg-black/20' />
            <Button
              variant='danger'
              size='sm'
              className='absolute top-2 right-2'
              onClick={handleRemove}
              disabled={disabled}
            >
              <Icon name='x' size={16} />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className='text-body-sm text-interactive-danger mt-2'>{error}</div>
      )}
    </div>
  );
}
