'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type MotionValue,
  PanInfo,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { EmoticonImage } from '@/entity/emoticon-set';
import { COLOR_MAP, ColorMap } from './color-picker';

interface CenterFocusCarouselProps {
  images: EmoticonImage[];
  itemWidth?: number;
  gap?: number;
  centerScale?: number;
  currentImageOrder?: number;
  setIsDragging: (isDragging: boolean) => void;
  setImageId: (imageId: string) => void;
  color: ColorMap;
  suppressPublish?: boolean;
}

function CarouselItem({
  image,
  extIdx,
  itemWidth,
  gap,
  centerScale,
  x,
  baseLeft,
  centerX,
  N,
  goToExtended,
  color,
}: {
  image: EmoticonImage;
  extIdx: number;
  itemWidth: number;
  gap: number;
  centerScale: number;
  x: MotionValue<number>;
  baseLeft: (i: number) => number;
  centerX: number;
  N: number;
  goToExtended: (extIdx: number) => void;
  color: ColorMap;
}) {
  const distance = useTransform(x, (v) => {
    const cardCenter = v + baseLeft(extIdx) + itemWidth / 2;
    return Math.abs(cardCenter - centerX);
  });

  const lerpStops = (d: number, stops: number[], values: number[]) => {
    const i = stops.findIndex((s) => d <= s);
    if (i === -1) return values[values.length - 1];
    if (i <= 0) return values[0];
    const d0 = stops[i - 1],
      d1 = stops[i];
    const v0 = values[i - 1],
      v1 = values[i];
    const t = Math.max(0, Math.min(1, (d - d0) / (d1 - d0)));
    return v0 + (v1 - v0) * t;
  };

  const scale = useTransform(distance, (d) =>
    lerpStops(
      d,
      [0, itemWidth * 0.8, itemWidth * 1.5, itemWidth * 3],
      [centerScale, Math.max(1, centerScale * 0.9), 1, 0.85],
    ),
  );
  const opacity = useTransform(distance, (d) =>
    lerpStops(
      d,
      [0, itemWidth * 0.5, itemWidth * 1.5, itemWidth * 3],
      [1, 0.2, 0.5, 0.4],
    ),
  );
  const zIndex = useTransform(distance, (d) =>
    lerpStops(d, [0, itemWidth * 0.5, itemWidth * 2], [30, 15, 1]),
  );

  const origIdx = ((extIdx % N) + N) % N;
  const displayOrder = origIdx + 1;

  return (
    <div
      className='relative flex-shrink-0 select-none'
      style={{
        width: itemWidth,
        height: itemWidth,
        marginRight: gap,
        overflow: 'visible',
      }}
      onClick={() => goToExtended(extIdx)}
    >
      <motion.div
        className='group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-white'
        style={{ scale, opacity, zIndex, transformOrigin: 'center center' }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Image
          src={image.webp_url ?? image.image_url}
          alt={`이모티콘 ${displayOrder}`}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          sizes={`${itemWidth}px`}
          draggable={false}
          priority
          style={{ backgroundColor: COLOR_MAP[color] }}
        />
      </motion.div>
    </div>
  );
}

export function CenterFocusCarousel({
  images,
  itemWidth = 120,
  gap = 20,
  centerScale = 1.2,
  currentImageOrder = 1,
  setIsDragging: setIsDraggingToParent,
  setImageId,
  color,
  suppressPublish = false,
}: CenterFocusCarouselProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [centerIdx, setCenterIdx] = useState(0);
  const lastPublishedIdRef = useRef<string | null>(null);
  const didInitRef = useRef(false);

  const [visibleSlots, setVisibleSlots] = useState<number>(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 1.5;
      if (w < 1024) return 2;
      return 3;
    };
    const onResize = () => setVisibleSlots(compute());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const N = images.length;
  if (N === 0) return null;

  useEffect(() => {
    didInitRef.current = false;
    lastPublishedIdRef.current = null;
  }, [images]);

  const initialOrigIdxRef = useRef<number>(
    Math.max(0, Math.min(N - 1, currentImageOrder - 1)),
  );

  const extended = useMemo(() => [...images, ...images, ...images], [images]);
  const toOriginal = (extIdx: number) => ((extIdx % N) + N) % N;
  const fromOriginalMiddle = (origIdx: number) => N + origIdx;

  const slot = itemWidth + gap;
  const containerWidth =
    itemWidth * visibleSlots + gap * Math.floor(visibleSlots);
  const baseLeft = (i: number) => i * slot;
  const centerX = containerWidth / 2;
  const getTargetX = (i: number) => centerX - (baseLeft(i) + itemWidth / 2);
  const minX = getTargetX(Math.max(0, extended.length - 1));
  const maxX = getTargetX(0);

  const findClosestToCenter = (currentX: number) => {
    let closest = 0,
      minDist = Infinity;
    for (let i = 0; i < extended.length; i++) {
      const cardCenter = currentX + baseLeft(i) + itemWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    return closest;
  };

  const wrapIfNeeded = (idx: number) => {
    if (idx < N) {
      const newIdx = idx + N;
      x.set(getTargetX(newIdx));
      setCenterIdx(newIdx);
      return newIdx;
    }
    if (idx >= 2 * N) {
      const newIdx = idx - N;
      x.set(getTargetX(newIdx));
      setCenterIdx(newIdx);
      return newIdx;
    }
    return idx;
  };

  const snapToClosest = (currentX: number, velocity = 0) => {
    let targetIndex = findClosestToCenter(currentX);
    if (Math.abs(velocity) > 500) {
      const dir = velocity > 0 ? -1 : 1;
      targetIndex = Math.max(
        0,
        Math.min(extended.length - 1, targetIndex + dir),
      );
    }
    const targetX = Math.max(minX, Math.min(maxX, getTargetX(targetIndex)));
    animate(x, targetX, {
      type: 'spring',
      stiffness: 420,
      damping: 42,
      mass: 0.8,
      onComplete: () => {
        const wrapped = wrapIfNeeded(targetIndex);
        setCenterIdx(wrapped);
      },
    });
  };

  useEffect(() => {
    if (!didInitRef.current) {
      const midIdx = fromOriginalMiddle(initialOrigIdxRef.current);
      x.set(getTargetX(midIdx));
      setCenterIdx(midIdx);
      didInitRef.current = true;
      return;
    }
    x.set(getTargetX(centerIdx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, visibleSlots, N]);

  useEffect(() => {
    if (suppressPublish) return;
    const img = images[toOriginal(centerIdx)];
    if (!img) return;

    if (lastPublishedIdRef.current === img.id) return;
    lastPublishedIdRef.current = img.id;

    setImageId(img.id);

    const currentQueryId = searchParams?.get('imageId');
    if (currentQueryId !== img.id) {
      router.replace(`/emoticon/${img.set_id}?imageId=${img.id}`, {
        scroll: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerIdx, images, suppressPublish]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    setIsDraggingToParent(false);
    snapToClosest(x.get(), info.velocity.x);
  };

  const goToOriginal = (origIdx: number) => {
    if (isDragging) return;
    const targetIdx = fromOriginalMiddle(origIdx);
    const targetX = Math.max(minX, Math.min(maxX, getTargetX(targetIdx)));
    animate(x, targetX, {
      type: 'spring',
      stiffness: 420,
      damping: 42,
      mass: 0.8,
      onComplete: () => setCenterIdx(targetIdx),
    });
  };

  const goToExtended = (extIdx: number) => {
    if (isDragging) return;
    const targetX = Math.max(minX, Math.min(maxX, getTargetX(extIdx)));
    animate(x, targetX, {
      type: 'spring',
      stiffness: 420,
      damping: 42,
      mass: 0.8,
      onComplete: () => setCenterIdx(wrapIfNeeded(extIdx)),
    });
  };

  const activeOriginalIndex = toOriginal(centerIdx);

  return (
    <div className='mx-auto w-full'>
      <div className='flex flex-col overflow-hidden rounded-3xl'>
        <div
          className='relative mx-auto w-full touch-pan-y overflow-hidden'
          style={{
            width: containerWidth,
            height: itemWidth * centerScale + 40,
          }}
        >
          <motion.div
            className='absolute top-1/2 flex -translate-y-1/2 transform cursor-grab items-center active:cursor-grabbing'
            style={{ x }}
            drag='x'
            dragConstraints={{ left: minX, right: maxX }}
            dragElastic={0.12}
            dragMomentum
            onDragStart={() => {
              setIsDragging(true);
              setIsDraggingToParent(true);
            }}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {extended.map((image, extIdx) => (
              <CarouselItem
                key={`${image.id}-${Math.floor(extIdx / N)}`}
                image={image}
                extIdx={extIdx}
                itemWidth={itemWidth}
                gap={gap}
                centerScale={centerScale}
                x={x}
                baseLeft={(i) => i * (itemWidth + gap)}
                centerX={centerX}
                N={N}
                goToExtended={goToExtended}
                color={color}
              />
            ))}
          </motion.div>
        </div>

        <div className='mt-8 flex justify-center gap-2'>
          {images.map((_, origIdx) => (
            <motion.button
              key={origIdx}
              onClick={() => goToOriginal(origIdx)}
              className='h-2 w-2 rounded-full transition-all duration-300'
              animate={{
                backgroundColor:
                  origIdx === activeOriginalIndex ? '#ffbf00' : '#dadfe6',
                scale: origIdx === activeOriginalIndex ? 1.5 : 1,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
