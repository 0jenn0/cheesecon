import Image from 'next/image';
import { IconButton } from '@/shared/ui/input';

export default function ImageItem({
  imageUrl,
  index,
  handleRemoveImage,
}: {
  imageUrl: string;
  index: number;
  handleRemoveImage: (index: number) => void;
}) {
  return (
    <div
      key={`${imageUrl}-${index}`}
      className='border-ghost relative h-[80px] w-[80px] overflow-hidden rounded-lg border'
    >
      <Image
        src={imageUrl}
        alt='uploaded image'
        fill
        className='object-cover'
        draggable={false}
      />
      <div className='absolute top-2 right-2'>
        <IconButton
          variant='danger'
          type='button'
          styleVariant='transparent'
          className='border-radius-rounded'
          iconClassName='icon-interactive-primary'
          icon='trash'
          iconSize={12}
          onClick={() => handleRemoveImage(index)}
        />
      </div>
    </div>
  );
}
