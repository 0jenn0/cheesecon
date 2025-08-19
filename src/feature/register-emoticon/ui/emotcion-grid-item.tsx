'use client';

import Image from 'next/image';
import { ComponentPropsWithRef, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { Spinner } from '@/shared/ui/feedback';
import { Checkbox } from '@/shared/ui/input';
import { useUploadImageToBucketMutation } from '@/feature/upload-image/model/upload-image-mutation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDraft } from '../model/draft-context';

const MAX_SIZE = 2; // 2mb

interface EmoticonGridItemProps extends ComponentPropsWithRef<'div'> {
  imageOrder: number;
  isDragMode?: boolean;
  showCheckbox?: boolean;
  showGrip?: boolean;
  imageSize?: number;
}

export default function EmoticonGridItem({
  imageOrder,
  className,
  isDragMode = false,
  showCheckbox = false,
  showGrip = false,
  imageSize,
  ...props
}: EmoticonGridItemProps) {
  const imageInSlot = useDraft((store) => store.byOrderOriginal[imageOrder]);
  const addImages = useDraft((store) => store.addImages);
  const uploadImageMutation = useUploadImageToBucketMutation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    imageInSlot?.webp_url ?? null,
  );

  const isDraggable = !!imageInSlot && isDragMode;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id: imageOrder,
    data: { image_order: imageOrder },
    disabled: !isDraggable,
  });

  const finalRootProps = isDraggable
    ? { ...attributes, ...listeners, ...props }
    : props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  } as const;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      const result = await uploadImageMutation.mutateAsync(formData);
      if (result.success) {
        const id = crypto.randomUUID();
        addImages([
          {
            id,
            image_url: result.data.url,
            image_order: imageOrder,
            blur_url: result.data.blurUrl ?? '',
            webp_url: result.data.webpUrl ?? '',
            is_representative: false,
          },
        ]);
        setImageUrl(result.data.webpUrl ?? result.data.url ?? null);
      }
    },
    [addImages, imageOrder, uploadImageMutation],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_SIZE * 1024 * 1024,
    disabled: uploadImageMutation.isPending || isDragMode,
    noClick: true,
  });

  const handleFileSelect = useCallback(() => {
    if (isDragMode) return;
    fileRef.current?.click();
  }, [isDragMode]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        onDrop(Array.from(files));
      }
      event.target.value = '';
    },
    [onDrop],
  );

  const hasImage = !!imageInSlot || !!imageUrl;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-primary relative flex aspect-square h-full w-full min-w-[60px] flex-col border border-white transition-all duration-100 ease-in-out',
        isDraggable && 'cursor-grab active:scale-95 active:cursor-grabbing',
        isDragging &&
          'border-radius-lg border-interactive-primary border border-dashed',
        isSorting && 'border-radius-lg border-ghost border',
        className,
      )}
      {...finalRootProps}
    >
      <div className='border-ghost absolute inset-0 aspect-square w-full overflow-hidden border-b'>
        {imageInSlot?.status === 'uploading' && (
          <div className='absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
            <Spinner size='lg' />
          </div>
        )}
        {imageInSlot &&
        (imageInSlot.status === 'done' || imageInSlot.image_url) ? (
          <div
            className='flex h-full w-full items-center justify-center'
            {...(isDragMode ? {} : getRootProps())}
            onClick={handleFileSelect}
          >
            {!isDragMode && (
              <>
                <input
                  ref={fileRef}
                  type='file'
                  accept='image/png,image/jpeg,image/gif,image/webp'
                  multiple
                  onChange={handleFileChange}
                  className='hidden'
                />
                <input {...getInputProps()} className='hidden' />
              </>
            )}
            <Image
              src={imageInSlot?.webp_url ?? imageUrl ?? ''}
              alt='emoticon'
              width={120}
              height={120}
              className='h-full w-auto object-cover'
              draggable={false}
              placeholder='blur'
              blurDataURL={imageInSlot?.blur_url ?? imageInSlot?.webp_url ?? ''}
            />
          </div>
        ) : (
          <div
            className='flex h-full w-full flex-col items-center justify-center gap-8'
            {...(isDragMode ? {} : getRootProps())}
            onClick={handleFileSelect}
          >
            {!isDragMode && (
              <>
                <input
                  ref={fileRef}
                  type='file'
                  accept='image/png,image/jpeg,image/gif,image/webp'
                  multiple
                  onChange={handleFileChange}
                  className='hidden'
                />
                <input {...getInputProps()} className='hidden' />
              </>
            )}
            <Icon name='image-plus' size={24} className='icon-ghost' />
            {imageSize && (
              <span className='text-body-sm text-black/20'>
                {imageSize}x{imageSize}
              </span>
            )}
          </div>
        )}
      </div>

      <div className='tablet:padding-12 z-10 flex h-full w-full flex-col items-center justify-between'>
        <div className='flex w-full items-center justify-between'>
          <div className='border-radius-rounded flex aspect-square min-w-24 items-center justify-center bg-white/10 backdrop-blur-sm'>
            <span className='text-body-sm text-black/60'>{imageOrder}</span>
          </div>
          {showCheckbox && (
            <EmoticonGridItemCheckbox imageId={imageInSlot?.id ?? ''} />
          )}
        </div>
        <div className='flex w-full items-center justify-end'>
          {showGrip && hasImage && (
            <div className='border-radius-rounded padding-4 bg-white/20 backdrop-blur-md'>
              <Icon name='grip-vertical' size={16} className='icon-secondary' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmoticonGridItemCheckbox({ imageId }: { imageId: string }) {
  const selectedImageIds = useDraft((store) => store.selectedImageIds);
  const isSelected = selectedImageIds.includes(imageId);
  const toggleSelectedImage = useDraft((store) => store.toggleSelectedImage);

  return (
    <Checkbox
      className='w-fit'
      status={isSelected ? 'checked' : 'unchecked'}
      onChange={(e) => toggleSelectedImage(imageId)}
    />
  );
}
