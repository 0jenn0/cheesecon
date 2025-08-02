import { ComponentPropsWithRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Icon } from '@/shared/ui/display';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { useImageUpload } from '@/feature/upload-image/use-upload-image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  const {
    previews,
    isUploading,
    inputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClick,
    handleFileSelect,
  } = useImageUpload();

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

  const hasImage = Boolean(previews[0]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    if (previews[0]) {
      onImageUpload?.(imageNumber, previews[0]);
    }
  }, [previews, onImageUpload]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn('cursor-pointer')}
      onClick={handleClick}
      {...props}
    >
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple={false}
        onChange={handleFileSelect}
        className='hidden'
      />
      <EmoticonItem.Root
        imageNumber={imageNumber}
        imageUrl={previews[0]}
        isUploading={isUploading}
        showCheckbox={showCheckbox}
        showGripIcon={showGripIcon}
        isDragging={isDragging}
      >
        <EmoticonItem.Content>
          <EmoticonItem.Header />
          <EmoticonItem.Body>
            {hasImage ? (
              <div className='width-32 height-32 bg-transparent' />
            ) : (
              <Icon name='image-plus' size={32} className='icon-ghost' />
            )}
          </EmoticonItem.Body>
          <EmoticonItem.Footer />
        </EmoticonItem.Content>
      </EmoticonItem.Root>
    </div>
  );
};

export default GridItem;
