import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib';
import { Spinner } from '@/shared/ui/feedback';
import { Checkbox } from '@/shared/ui/input';
import Icon from '../../../icon/icon';
import ImageNumberBadge from './number-badge';

export default function OverlayItem({
  imageNumber,
  isLoading,
  showImageIcon,
  showGrip,
  showCheckbox,
  isSelected,
  onCheckboxClick,
}: {
  imageNumber: number;
  isLoading: boolean;
  showImageIcon: boolean;
  showGrip: boolean;
  showCheckbox: boolean;
  isSelected: boolean;
  onCheckboxClick?: () => void;
}) {
  const [isChecked, setIsChecked] = useState(isSelected);

  const renderCenterContent = () => {
    if (isLoading) {
      return <Spinner size='lg' />;
    }

    if (showImageIcon) {
      return (
        <Icon
          name='image-plus'
          size={16}
          className={cn(
            'icon-ghost width-16 height-16 tablet:width-24 tablet:height-24',
          )}
        />
      );
    }

    return (
      <div className='width-16 height-16 tablet:width-24 tablet:height-24' />
    );
  };

  const renderBottomContent = () => {
    if (showGrip) {
      return (
        <Icon
          name='grip-vertical'
          size={24}
          className='icon-secondary border-radius-rounded padding-4 bg-white/60'
        />
      );
    }

    return <div className='width-24 height-24' />;
  };

  return (
    <div className='border-interactive-secondary absolute top-0 right-0 bottom-0 left-0 flex aspect-square w-full flex-col gap-0 border-b'>
      <div className='padding-8 flex w-full items-center justify-between'>
        <ImageNumberBadge imageNumber={imageNumber} />
        {showCheckbox ? (
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            checked={isSelected || isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              onCheckboxClick?.();
            }}
          />
        ) : (
          <div className='width-24 height-24' />
        )}
      </div>

      <div className='flex w-full flex-1 items-center justify-center'>
        {renderCenterContent()}
      </div>

      <div className='padding-8 flex w-full items-center justify-end'>
        {renderBottomContent()}
      </div>
    </div>
  );
}
