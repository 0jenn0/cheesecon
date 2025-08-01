import { ComponentProps, ComponentPropsWithRef, useState } from 'react';
import Icon from '../../icon/icon';
import { emoticonItemVariant } from './emoticon-item.style';
import { BottomBar, OverlayItem } from './ui';

export interface EmoticonItemProps extends ComponentPropsWithRef<'div'> {
  imageNumber: number;
  imageUrl?: string;
  showBottomBar?: boolean;
  showGrip?: boolean;
  showCheckbox?: boolean;
  isLoading?: boolean;
  likeCount?: number;
  commentCount?: number;
  isDragging?: boolean;
  isChanged?: boolean;
  isSelected?: boolean;
  onCheckboxClick?: () => void;
}

export default function EmoticonItem({
  imageNumber,
  imageUrl,
  showBottomBar = false,
  showGrip = false,
  showCheckbox = false,
  isLoading = false,
  likeCount = 0,
  commentCount = 0,
  isDragging = false,
  isChanged = false,
  isSelected = false,
  onCheckboxClick,
  ...props
}: EmoticonItemProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const shouldShowImage = imageUrl && !isImageError;
  const shouldShowErrorIcon = isImageError;
  const shouldShowLoading =
    isLoading || (!isImageLoaded && Boolean(imageUrl) && !isImageError);

  return (
    <div
      className={emoticonItemVariant({
        variant: isDragging ? 'dragging' : isChanged ? 'changed' : 'default',
      })}
      {...props}
    >
      <div className='border-interactive-secondary border-radius-lg aspect-square w-full overflow-hidden'>
        {shouldShowImage && (
          <img
            src={imageUrl}
            alt='emoticon'
            className='h-full w-full object-cover'
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageError(true)}
          />
        )}
        {shouldShowErrorIcon && (
          <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
            <Icon name='alert-circle' size={16} className='icon-danger' />
            <span className='text-body-sm text-danger'>이미지 로딩 실패</span>
          </div>
        )}
      </div>
      <OverlayItem
        imageNumber={imageNumber}
        isLoading={shouldShowLoading}
        showImageIcon={!imageUrl}
        showGrip={isDragging || showGrip}
        showCheckbox={showCheckbox}
        isSelected={isSelected}
        onCheckboxClick={onCheckboxClick}
      />
      {showBottomBar && (
        <BottomBar likeCount={likeCount} commentCount={commentCount} />
      )}
    </div>
  );
}
