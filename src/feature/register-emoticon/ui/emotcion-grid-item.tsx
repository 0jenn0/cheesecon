'use client';

import Image from 'next/image';
import { ComponentPropsWithRef, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
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
  const setStatus = useDraft((store) => store.setStatus);
  const addImages = useDraft((store) => store.addImages);
  const uploadImageMutation = useUploadImageToBucketMutation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mouseHover, setMouseHover] = useState(false);
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

      setStatus(imageOrder, 'uploading');
      setImageUrl(null);

      const result = await uploadImageMutation.mutateAsync(formData);
      if (result.success) {
        const newImageUrl = result.data.webpUrl ?? result.data.url ?? null;
        setImageUrl(newImageUrl);

        const id = crypto.randomUUID();
        addImages([
          {
            id,
            image_url: result.data.url,
            image_order: imageOrder,
            blur_url: result.data.blurUrl ?? '',
            webp_url: result.data.webpUrl ?? '',
            is_representative: false,
            poster_url: result.data.posterUrl ?? '',
            mp4_url: result.data.mp4Url ?? '',
            webm_url: result.data.webmUrl ?? '',
          },
        ]);
        setStatus(imageOrder, 'done');
      }
    },
    [addImages, imageOrder, uploadImageMutation, setStatus],
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
    maxSize: MAX_SIZE * 1024 * 1024,
    disabled: uploadImageMutation.isPending || isDragMode,
    noClick: true,
  });

  const finalRootProps = isDraggable
    ? { ...attributes, ...listeners, ...props }
    : { ...getRootProps(), ...props };

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
        'bg-primary relative flex aspect-square h-full w-full min-w-[60px] cursor-pointer flex-col border border-white transition-all duration-100 ease-in-out',
        isDraggable && 'cursor-grab active:scale-95 active:cursor-grabbing',
        isDragging &&
          'border-radius-lg border-interactive-primary border border-dashed',
        isSorting && 'border-radius-lg border-ghost border',
        className,
        isDragActive &&
          'border-radius-lg border-interactive-primary effect-shadow-8 scale-110 border border-dashed',
      )}
      {...finalRootProps}
      onClick={isDragMode ? undefined : handleFileSelect}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      <div className='border-ghost absolute inset-0 aspect-square w-full overflow-hidden border-b'>
        {imageInSlot?.status === 'uploading' && (
          <div className='absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
            <Spinner size='lg' />
          </div>
        )}
        {imageInSlot &&
        ((imageInSlot.status && imageInSlot.status === 'done') ||
          imageInSlot.image_url) ? (
          <div className='flex h-full w-full items-center justify-center'>
            {!showGrip && (
              <AnimatePresence>
                {mouseHover && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className='border-radius-rounded absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/70'
                  >
                    <Icon name='image-plus' size={24} className='icon-ghost' />
                    <span className='text-body-sm font-semibold text-white'>
                      이미지 변경
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {!isDragMode && (
              <>
                <input
                  ref={fileRef}
                  type='file'
                  accept='image/png,image/jpeg,image/gif,image/webp'
                  onChange={handleFileChange}
                  className='hidden'
                />
                <input {...getInputProps()} className='hidden' />
              </>
            )}
            {imageInSlot?.mp4_url || imageInSlot?.webm_url ? (
              <video
                src={imageInSlot?.mp4_url ?? imageInSlot?.webm_url ?? ''}
                className='h-full w-auto object-cover'
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                src={
                  imageUrl ??
                  imageInSlot?.webp_url ??
                  imageInSlot?.poster_url ??
                  imageInSlot?.mp4_url ??
                  imageInSlot?.webm_url ??
                  imageInSlot?.image_url ??
                  ''
                }
                alt='emoticon'
                width={120}
                height={120}
                className='h-full w-auto object-cover'
                draggable={false}
                placeholder='blur'
                blurDataURL={
                  imageInSlot?.blur_url ?? imageInSlot?.webp_url ?? ''
                }
              />
            )}
          </div>
        ) : (
          <div className='flex h-full w-full cursor-pointer flex-col items-center justify-center gap-8'>
            {!isDragMode && (
              <>
                <input
                  ref={fileRef}
                  type='file'
                  accept='image/png,image/jpeg,image/gif,image/webp,image/heic,image/heif'
                  multiple
                  onChange={handleFileChange}
                  className='hidden'
                />
                <input {...getInputProps()} className='hidden' />
              </>
            )}
            <Icon
              name='image-plus'
              size={24}
              className={cn(
                'transition-all duration-100 ease-in-out',
                isDragActive ? 'text-yellow-500' : 'icon-ghost',
              )}
            />
            {imageSize && (
              <span
                className={cn(
                  'text-body-sm transition-colors duration-100 ease-in-out',
                  isDragActive ? 'text-yellow-600' : 'text-black/20',
                )}
              >
                {isDragActive ? '이미지 추가' : `${imageSize}x${imageSize}`}
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
      onChange={() => toggleSelectedImage(imageId)}
    />
  );
}
