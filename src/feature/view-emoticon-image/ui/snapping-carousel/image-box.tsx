import Image from 'next/image';
import { EmoticonImage } from '@/entity/emoticon-set';
import { COLOR_MAP, ColorMap } from '../../color-picker';

interface ImageBoxProps {
  color: ColorMap;
  imageSize: number;
  isCenter?: boolean;
  imageData: EmoticonImage | undefined;
}

export default function ImageBox({
  color,
  imageSize,
  imageData,
  isCenter = false,
}: ImageBoxProps) {
  return (
    <div className='border-radius-xl flex aspect-square flex-shrink-0 cursor-grab items-center justify-center overflow-hidden'>
      {imageData ? (
        <Image
          src={imageData?.webp_url ?? imageData?.image_url}
          alt={`image-${imageData.id}`}
          width={isCenter ? imageSize : imageSize * 0.8}
          height={isCenter ? imageSize : imageSize * 0.8}
          placeholder='blur'
          blurDataURL={imageData?.blur_url ?? imageData?.image_url}
          className='object-contain transition-transform duration-300 group-hover:scale-110 active:cursor-grabbing'
          draggable={false}
          priority={isCenter}
          loading={isCenter ? 'eager' : 'lazy'}
          style={{
            backgroundColor: COLOR_MAP[color],
            width: isCenter ? imageSize : imageSize * 0.8,
            height: isCenter ? imageSize : imageSize * 0.8,
            opacity: isCenter ? 1 : 0.5,
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
