import Image from 'next/image';
import { motion } from 'framer-motion';
import { EmoticonImage } from '@/entity/emoticon-set';
import { COLOR_MAP, ColorMap } from '../../color-picker';

interface ImageBoxProps {
  color: ColorMap;
  imageSize: number;
  isCenter?: boolean;
  imageData: EmoticonImage;
}

export default function ImageBox({
  color,
  imageSize,
  imageData,
  isCenter = false,
}: ImageBoxProps) {
  const currentSize = isCenter ? imageSize : imageSize * 0.8;

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0.2,
        }}
        whileHover={{
          scale: isCenter ? 1.02 : 0.92,
          opacity: isCenter ? 1 : 0.6,
        }}
        className='border-radius-xl flex aspect-square flex-shrink-0 cursor-grab items-center justify-center overflow-hidden'
        animate={{
          scale: isCenter ? 1 : 0.9,
          opacity: isCenter ? 1 : 0.5,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
      >
        <Image
          src={imageData?.webp_url ?? imageData?.image_url}
          alt={`image-${imageData.id}`}
          placeholder='blur'
          width={currentSize}
          height={currentSize}
          blurDataURL={imageData?.blur_url ?? imageData?.image_url}
          className='object-contain transition-transform duration-300 group-hover:scale-110 active:cursor-grabbing'
          draggable={false}
          priority={isCenter}
          loading={isCenter ? 'eager' : 'lazy'}
          style={{
            backgroundColor: COLOR_MAP[color],
          }}
        />
      </motion.div>
    </div>
  );
}
