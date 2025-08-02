import { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { useCreateEmoticonImageMutation } from '@/entity/emoticon-images/query/mutation';
import { useUploadImageMutation } from '@/feature/upload-image/model/upload-image-mutation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useEmoticonRegister from '../model/hook';

export interface GridItemProps
  extends Omit<ComponentPropsWithRef<'div'>, 'id'> {
  id: number;
  imageNumber: number;
  showCheckbox?: boolean;
  showGripIcon?: boolean;
  isDraggable?: boolean;
  onImageUpload?: (imageNumber: number, preview: string) => void;
}

const GridItem = ({
  id,
  imageNumber,
  showCheckbox = false,
  showGripIcon = false,
  onImageUpload,
  ref,
  isDraggable = false,
  ...props
}: GridItemProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const uploadImageMutation = useUploadImageMutation();
  const createEmoticonImageMutation = useCreateEmoticonImageMutation();
  const { emoticonSet } = useEmoticonRegister();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();

        acceptedFiles.forEach((file) => {
          formData.append('file', file);
        });

        try {
          const result = await uploadImageMutation.mutateAsync(formData);
          setImageUrl(result.url);

          // TODO: 토스트로 성공처리
          console.log('Upload successful:', result);
          // TODO: 이미지 업로드 성공 후 리다이렉팅 추가
        } catch (error) {
          // TODO: 토스트로 에러처리
          console.error('Upload error:', error);
        }
      }
    },
    [uploadImageMutation],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024,
    disabled: uploadImageMutation.isPending || isDraggable,
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isDraggable,
  });

  const hasImage = Boolean(imageUrl);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    if (imageUrl) {
      onImageUpload?.(imageNumber, imageUrl);
    }
  }, [imageUrl, onImageUpload]);

  const dragProps = isDraggable ? { ...attributes, ...listeners } : {};
  const dropzoneProps = !isDraggable ? getRootProps() : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('cursor-pointer')}
      {...dragProps}
      {...dropzoneProps}
      {...props}
    >
      {!isDraggable && (
        <input
          {...getInputProps()}
          type='file'
          accept='image/*'
          multiple={false}
          className='hidden'
        />
      )}
      <EmoticonItem.Root
        imageNumber={imageNumber}
        imageUrl={imageUrl ?? ''}
        isUploading={uploadImageMutation.isPending}
        showCheckbox={showCheckbox}
        showGripIcon={showGripIcon}
        isDragging={isDragging}
      >
        <EmoticonItem.Content
          className={cn(
            'transition-all duration-300',
            isDragActive &&
              'border-radius-xl effect-shadow-8 border-ghost border',
          )}
        >
          <EmoticonItem.Header />
          <EmoticonItem.Body>
            {hasImage ? (
              <div className='width-32 height-32 bg-transparent' />
            ) : (
              <Icon
                name='image-plus'
                size={32}
                className={cn(
                  'transition-all duration-300',
                  isDragActive
                    ? 'scale-125 text-[var(--color-cheesecon-primary-400)]'
                    : 'text-[var(--color-cheesecon-secondary-200)]',
                )}
              />
            )}
          </EmoticonItem.Body>
          <EmoticonItem.Footer />
        </EmoticonItem.Content>
      </EmoticonItem.Root>
    </div>
  );
};

export default GridItem;
