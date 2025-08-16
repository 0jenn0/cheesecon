import { ComponentPropsWithRef, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { useUploadImageToBucketMutation } from '@/feature/upload-image/model/upload-image-mutation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useUIContext from './emoticon-section/provider/ui-provider';

export interface GridItemProps
  extends Omit<ComponentPropsWithRef<'div'>, 'id'> {
  id: number;
  imageNumber: number;
  imageUrl?: string;
  onImageUpload?: (
    imageNumber: number,
    preview: string,
    blurUrl: string | null,
    webpUrl: string | null,
  ) => void;
}
const GridItem = ({
  id,
  imageNumber,
  imageUrl,
  onImageUpload,
  ...props
}: GridItemProps) => {
  const { isMultipleSelect, isOrderChange } = useUIContext();
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
          const { url, blurUrl, webpUrl } = result.data;
          onImageUpload?.(imageNumber, url, blurUrl ?? null, webpUrl ?? null);
          return;
        }
      }
    },
    [uploadImageMutation, imageNumber, onImageUpload],
  );

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
    disabled: uploadImageMutation.isPending || isOrderChange,
    noClick: true,
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
    disabled: !isOrderChange,
  });

  const hasImage = Boolean(imageUrl);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const dragProps = isOrderChange ? { ...attributes, ...listeners } : {};
  const dropzoneProps = !isOrderChange ? getRootProps() : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('cursor-pointer')}
      {...dragProps}
      {...dropzoneProps}
      {...props}
    >
      {!isOrderChange && (
        <input
          {...getInputProps()}
          type='file'
          accept='image/*'
          multiple={false}
          className='hidden'
        />
      )}

      {!isOrderChange && (
        <input
          ref={fileInputRef}
          type='file'
          accept='image/png,image/jpeg,image/gif,image/webp'
          multiple={false}
          onChange={handleFileChange}
          className='hidden'
        />
      )}

      <EmoticonItem.Root
        imageNumber={imageNumber}
        imageUrl={imageUrl ?? ''}
        isUploading={uploadImageMutation.isPending}
        showCheckbox={isMultipleSelect}
        showGripIcon={isOrderChange}
        showNumberBadge={true}
        isDragging={isDragging}
      >
        <EmoticonItem.Content
          className={cn(
            'transition-all duration-300',
            isDragActive &&
              'border-radius-xl effect-shadow-8 border-ghost scale-105 border',
          )}
          onClick={!isOrderChange ? handleFileSelect : undefined}
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
