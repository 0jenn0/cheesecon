'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentPropsWithRef, useEffect, useState } from 'react';
import { PanInfo, motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';
import { EmoticonImage } from '@/entity/emoticon-set/type';

const COLOR_MAP = {
  blue: '#C6EAFF',
  pink: '#FFADC6',
  black: '#000000',
  white: '#FFFFFF',
} as const;

interface ImageViewerProps extends ComponentPropsWithRef<'div'> {
  images: {
    prev?: EmoticonImage;
    current: EmoticonImage;
    next?: EmoticonImage;
  };
  currentImageOrder?: number;
  onImageOrderChange?: (newImageOrder: number) => void;
  isInModal?: boolean;
}

export default function ImageViewer({
  images,
  currentImageOrder: propCurrentImageOrder,
  onImageOrderChange,
  isInModal = false,
  ...props
}: ImageViewerProps) {
  const [color, setColor] = useState<keyof typeof COLOR_MAP>('blue');

  const handleChangeColor = (color: keyof typeof COLOR_MAP) => {
    setColor(color);
  };

  const pathname = usePathname();
  const setId = pathname.split('/')[2];

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center gap-12'>
      <ColorPicker color={color} handleChangeColor={handleChangeColor} />
      <ImageCarousel images={images} color={color} setId={setId} />
    </div>
  );
}

function ColorChip({
  color,
  onClick,
}: {
  color: keyof typeof COLOR_MAP;
  onClick?: (colorName: keyof typeof COLOR_MAP) => void;
}) {
  return (
    <button
      type='button'
      className='height-24 border-radius-md border-outline w-24 cursor-pointer border-2 border-white'
      style={{ backgroundColor: COLOR_MAP[color] }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(color);
      }}
    />
  );
}

function ColorPicker({
  color,
  handleChangeColor,
}: {
  color: keyof typeof COLOR_MAP;
  handleChangeColor: (color: keyof typeof COLOR_MAP) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      layout
      className='z-index-popover padding-8 border-radius-lg absolute top-0 right-0 flex items-center justify-center gap-8 bg-gray-100/60 backdrop-blur-sm'
      animate={{
        width: isOpen ? 'auto' : 'auto',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      }}
    >
      <motion.div
        className='flex cursor-pointer items-center gap-4'
        onClick={!isOpen ? handleToggle : undefined}
      >
        <ColorChip color={color} onClick={handleToggle} />
        <motion.div
          className='height-16 border-r border-gray-300'
          animate={{
            opacity: isOpen ? 0 : 1,
            width: isOpen ? 0 : 'auto',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
        />
      </motion.div>

      <motion.div
        className='flex items-center gap-8'
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          width: isOpen ? 'auto' : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          duration: 0.3,
        }}
        style={{ overflow: 'hidden' }}
      >
        {Object.entries(COLOR_MAP).map(([color, value]) => (
          <div key={color} className='flex items-center gap-4'>
            <ColorChip
              color={color as keyof typeof COLOR_MAP}
              onClick={handleChangeColor}
            />
            <div className='height-24 border-r border-gray-300' />
          </div>
        ))}
        <motion.button
          type='button'
          onClick={handleToggle}
          className='cursor-pointer'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 270,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
          >
            <Icon name='chevron-down' size={20} className='icon-secondary' />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function ImageCarousel({
  images,
  color,
  setId,
}: {
  images: {
    prev?: EmoticonImage;
    current: EmoticonImage;
    next?: EmoticonImage;
  };
  color: keyof typeof COLOR_MAP;
  setId: string;
}) {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(
    null,
  );

  const router = useRouter();
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 60;

    if (info.offset.x > threshold) {
      setDragDirection('left');
      const prevImageId = images.prev?.id;

      if (prevImageId) {
        router.push(`/emoticon/${setId}/${prevImageId}`);
      }
    } else if (info.offset.x < -threshold) {
      setDragDirection('right');
      const nextImageId = images.next?.id;

      if (nextImageId) {
        router.push(`/emoticon/${setId}/${nextImageId}`);
      }
    }
  };

  return (
    <div className='relative w-full flex-1 overflow-hidden'>
      <div className='flex h-full w-full items-center justify-center overflow-hidden'>
        <div className='flex w-full items-center justify-center gap-24 overflow-hidden px-4'>
          {[images.prev, images.current, images.next].map((image, index) => (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
                x: dragDirection === 'left' ? -50 : 50,
                rotate: dragDirection === 'left' ? -3 : 3,
              }}
              animate={{
                opacity: index === 1 ? 1 : 0.4,
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 20,
                duration: 0.6,
                delay: index * 0.1,
              }}
              key={`${image?.id}-${index}`}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className={cn(
                'flex aspect-square cursor-grab items-center justify-center rounded-lg active:cursor-grabbing',
                index === 1
                  ? 'laptop:max-w-[min(60dvw,360px)] w-full max-w-[min(60dvw,240px)] flex-shrink-0'
                  : 'laptop:max-w-[min(40dvw,240px)] w-full max-w-[min(40dvw,140px)] flex-shrink-0',
              )}
              style={{
                backgroundColor: image ? COLOR_MAP[color] : 'transparent',
              }}
              whileHover={{
                scale: index === 1 ? 1.05 : 1.02,
                y: -5,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { type: 'spring', stiffness: 600, damping: 15 },
              }}
            >
              {image ? (
                <Image
                  src={image?.image_url}
                  alt='이모티콘 이미지'
                  width={500}
                  height={500}
                  className='select-cover object-contain'
                  draggable={false}
                />
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>

      <div className='pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white/30 to-transparent' />
      <div className='pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white/30 to-transparent' />

      {images.prev && (
        <Link
          href={`/emoticon/${setId}/${images.prev.id}`}
          className='padding-12 absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95'
          onClick={() => setDragDirection('left')}
        >
          <Icon
            name='chevron-down'
            size={20}
            className='icon-secondary rotate-90'
          />
        </Link>
      )}

      {images.next && (
        <Link
          href={`/emoticon/${setId}/${images.next.id}`}
          className='padding-12 absolute top-1/2 right-4 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95'
          onClick={() => setDragDirection('right')}
        >
          <Icon
            name='chevron-up'
            size={20}
            className='text-secondary rotate-90'
          />
        </Link>
      )}
    </div>
  );
}
