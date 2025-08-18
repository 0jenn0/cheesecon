import Image from 'next/image';
import { ComponentPropsWithRef, useState } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { Checkbox } from '@/shared/ui/input';
import { EmoticonImage } from '@/entity/emoticon-set';

interface EmoticonGridItemProps extends ComponentPropsWithRef<'div'> {
  imageNumber: number;
  image?: EmoticonImage;
  isUploading?: boolean;
  isDragging?: boolean;
  showCheckbox?: boolean;
  showGrip?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

export default function EmoticonGridItem({
  imageNumber,
  image,
  isUploading,
  className,
  showCheckbox = false,
  showGrip = false,
  onCheckboxChange,
  ...props
}: EmoticonGridItemProps) {
  return (
    <div
      className={cn(
        'bg-primary relative flex aspect-square h-full w-full min-w-[120px] flex-col',
        className,
      )}
      {...props}
    >
      <div className='border-ghost absolute inset-0 aspect-square w-full overflow-hidden border-b'>
        {image?.webp_url || image?.image_url ? (
          <Image
            src={image.webp_url ?? image.image_url ?? ''}
            alt='emoticon'
            width={120}
            height={120}
            className='h-full w-full object-contain'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <Icon name='image-plus' size={24} className='icon-ghost' />
          </div>
        )}
      </div>
      <div className='padding-12 flex h-full w-full flex-col items-center justify-between'>
        <div className='flex w-full items-center justify-between'>
          <div className='border-radius-rounded flex aspect-square min-w-24 items-center justify-center bg-white/20 backdrop-blur-md'>
            <span className='text-body-sm'>{imageNumber}</span>
          </div>
          {showCheckbox && (
            <EmoticonGridItemCheckbox onCheckboxChange={onCheckboxChange} />
          )}
        </div>
        <div className='flex w-full items-center justify-end'>
          {showGrip && (
            <Icon name='grip-vertical' size={16} className='icon-ghost' />
          )}
        </div>
      </div>
    </div>
  );
}

function EmoticonGridItemCheckbox({
  onCheckboxChange,
}: {
  onCheckboxChange?: (checked: boolean) => void;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsSelected(checked);
    onCheckboxChange?.(checked);
  };

  return (
    <Checkbox
      className='w-fit'
      status={isSelected ? 'checked' : 'unchecked'}
      onChange={(e) => handleCheckboxChange(e.target.checked)}
    />
  );
}
