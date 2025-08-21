'use client';

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
          scale: 0.7,
          opacity: 0.1,
        }}
        whileHover={{
          scale: isCenter ? 1.05 : 0.95,
          opacity: isCenter ? 1 : 0.8,
        }}
        className='border-radius-xl flex aspect-square flex-shrink-0 cursor-grab items-center justify-center overflow-hidden'
        animate={{
          scale: isCenter ? 1 : 0.85,
          opacity: isCenter ? 1 : 0.4,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.15,
        }}
      >
        {!imageData.webm_url && !imageData.mp4_url && (
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
        )}
        {(imageData.webm_url || imageData.mp4_url) && (
          <video
            src={imageData.webm_url ?? imageData.mp4_url ?? ''}
            className='object-contain transition-transform duration-300 group-hover:scale-110 active:cursor-grabbing'
            draggable={false}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            width={currentSize}
            height={currentSize}
            preload='auto'
            poster={imageData.blur_url ?? imageData.image_url}
            style={{
              backgroundColor: COLOR_MAP[color],
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
