'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PanInfo, animate, motion, useMotionValue } from 'framer-motion';

type SnapCarouselProps<T> = {
  items: T[];
  itemWidth: number;
  gap?: number;

  initialImageOrder?: number;
  onIndexChange?: (item: T) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  draggable?: boolean;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  enableKeyboard?: boolean;
};

export function SnapCarousel<T>({
  items,
  itemWidth,
  gap = 16,
  initialImageOrder: initialImageOder = 1,
  onIndexChange,
  renderItem,
  draggable = true,
  spring = { stiffness: 320, damping: 32, mass: 1 },
  enableKeyboard = true,
}: SnapCarouselProps<T>) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [viewportW, setViewportW] = useState(0);
  const count = items.length;
  const pitch = itemWidth + gap;

  const centerOffset = Math.max((viewportW - itemWidth) / 2, 0);

  const indexToX = useCallback(
    (i: number) => centerOffset - i * pitch,
    [centerOffset, pitch],
  );

  const xToIndex = useCallback(
    (xx: number) => Math.round((centerOffset - xx) / pitch),
    [centerOffset, pitch],
  );

  const rightMax = indexToX(0);
  const leftMax = indexToX(count - 1);

  useLayoutEffect(() => {
    const measure = () => setViewportW(viewportRef.current?.clientWidth ?? 0);
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    if (viewportW === 0 || count === 0) return;

    const initialZero = clamp((initialImageOder ?? 1) - 1, 0, count - 1);
    x.set(indexToX(initialZero));
    onIndexChange?.(items[initialZero]);
    didInit.current = true;
  }, [viewportW, count, initialImageOder, indexToX, items, onIndexChange, x]);

  const prevInitial = useRef<number>(initialImageOder);
  useEffect(() => {
    if (prevInitial.current === initialImageOder) return;
    prevInitial.current = initialImageOder;

    const idx = clamp((initialImageOder ?? 1) - 1, 0, count - 1);
    animate(x, indexToX(idx), {
      type: 'spring',
      stiffness: spring.stiffness ?? 320,
      damping: spring.damping ?? 32,
      mass: spring.mass ?? 1,
    });
    onIndexChange?.(items[idx]);
  }, [initialImageOder, count, indexToX, items, onIndexChange, spring, x]);

  const snapToIndex = useCallback(
    (i: number) => {
      const clamped = clamp(i, 0, count - 1);
      animate(x, indexToX(clamped), {
        type: 'spring',
        stiffness: spring.stiffness ?? 320,
        damping: spring.damping ?? 32,
        mass: spring.mass ?? 1,
      });
      onIndexChange?.(items[clamped]);
    },
    [count, indexToX, items, onIndexChange, spring, x],
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const currentX = x.get();
      const projected = currentX + info.velocity.x * 0.25;
      let targetIndex = xToIndex(projected);

      const VELOCITY_THRESHOLD = 800;
      if (info.velocity.x <= -VELOCITY_THRESHOLD) targetIndex += 1;
      else if (info.velocity.x >= VELOCITY_THRESHOLD) targetIndex -= 1;

      snapToIndex(targetIndex);
    },
    [snapToIndex, x, xToIndex],
  );

  useEffect(() => {
    if (!enableKeyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (!viewportRef.current) return;
      const within =
        document.activeElement === document.body ||
        viewportRef.current.contains(document.activeElement);
      if (!within) return;

      const current = clamp(xToIndex(x.get()), 0, count - 1);
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        snapToIndex(current - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        snapToIndex(current + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count, enableKeyboard, snapToIndex, x, xToIndex]);

  const dragConstraints = { left: leftMax, right: rightMax };

  return (
    <div
      ref={viewportRef}
      className='relative flex w-full items-center justify-center overflow-hidden select-none'
      aria-roledescription='carousel'
      role='region'
    >
      <motion.div
        className='flex shrink-0 items-center justify-center'
        style={{ x, gap }}
        drag={draggable ? 'x' : false}
        dragElastic={0.2}
        dragMomentum={false} // 스냅 UX에 더 안정적
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className='shrink-0'
            style={{ width: itemWidth }}
            aria-label={`Item ${i + 1} of ${count}`}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
