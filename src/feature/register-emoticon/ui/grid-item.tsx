import { useState } from 'react';
import { Icon } from '@/shared/ui/display';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { IconButton } from '@/shared/ui/input';
import { useImageUpload } from '@/feature/upload-image/use-upload-image';

export interface GridItemProps {
  imageNumber: number;
  showCheckbox?: boolean;
}

export default function GridItem({
  imageNumber,
  showCheckbox = false,
}: GridItemProps) {
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
  const [showGripIcon, setShowGripIcon] = useState(false);

  const hasImage = previews[0];

  const handleMouseEnter = () => {
    if (showCheckbox) {
      return null;
    }

    setShowGripIcon(true);
  };

  const handleMouseLeave = () => {
    setShowGripIcon(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className='cursor-pointer'
      onClick={handleClick}
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
}
