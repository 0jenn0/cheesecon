import Image from 'next/image';
import { EmoticonImage } from '@/entity/emoticon-set';
import { COLOR_MAP, ColorMap } from '../../color-picker';

interface ImageBoxProps {
  color: ColorMap;
  imageSize: number;
  isCenter?: boolean;
  imageData: EmoticonImage | undefined;
  setId: string;
}

export default function ImageBox({
  color,
  imageSize,
  isCenter,
  imageData,
  setId,
}: ImageBoxProps) {
  return (
    <div className='border-radius-xl flex aspect-square h-full w-full flex-shrink-0 cursor-grab items-center justify-center overflow-hidden'>
      {imageData ? (
        <Image
          src={imageData?.webp_url ?? imageData?.image_url}
          alt={`image-${imageData.id}`}
          width={imageSize}
          height={imageSize}
          placeholder='blur'
          blurDataURL={imageData?.blur_url ?? imageData?.image_url}
          className='object-contain transition-transform duration-300 group-hover:scale-110 active:cursor-grabbing'
          draggable={false}
          style={{
            backgroundColor: COLOR_MAP[color],
            width: imageSize,
            height: imageSize,
          }}
        />
      ) : (
        <div
          className='flex items-center justify-center text-gray-400'
          style={{
            backgroundColor: COLOR_MAP[color],
            width: imageSize,
            height: imageSize,
          }}
        >
          <div className='text-sm'>로딩 중...</div>
        </div>
      )}
    </div>
  );
}
