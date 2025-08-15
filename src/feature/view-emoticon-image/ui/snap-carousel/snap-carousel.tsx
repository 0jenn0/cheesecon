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
  setIsDragging?: (isDragging: boolean) => void;
};

export default function SnapCarousel<T>({
  items,
  itemWidth,
  gap = 16,
  initialImageOrder = 1,
  onIndexChange,
  renderItem,
  draggable = true,
  spring = { stiffness: 320, damping: 32, mass: 1 },
  enableKeyboard = true,
  setIsDragging,
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

  const VISIBLE = 3;
  const OVERSCAN = 2;

  const computeRange = useCallback(
    (centerIndex: number) => {
      const half = Math.floor(VISIBLE / 2);
      const start = clamp(centerIndex - half - OVERSCAN, 0, count - 1);
      const end = clamp(
        centerIndex + (VISIBLE - half - 1) + OVERSCAN,
        0,
        count - 1,
      );
      return { start, end };
    },
    [count],
  );

  const [range, setRange] = useState(() => {
    const initialZero = clamp((initialImageOrder ?? 1) - 1, 0, count - 1);
    return computeRange(initialZero);
  });

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    if (viewportW === 0 || count === 0) return;

    const initialZero = clamp((initialImageOrder ?? 1) - 1, 0, count - 1);
    x.set(indexToX(initialZero));
    onIndexChange?.(items[initialZero]);
    setRange(computeRange(initialZero));

    didInit.current = true;
  }, [
    viewportW,
    count,
    initialImageOrder,
    indexToX,
    items,
    onIndexChange,
    x,
    computeRange,
  ]);

  const prevInitial = useRef<number>(initialImageOrder);
  useEffect(() => {
    if (prevInitial.current === initialImageOrder) return;
    prevInitial.current = initialImageOrder;

    const idx = clamp((initialImageOrder ?? 1) - 1, 0, count - 1);
    setRange(computeRange(idx));
    animate(x, indexToX(idx), {
      type: 'spring',
      stiffness: spring.stiffness ?? 320,
      damping: spring.damping ?? 32,
      mass: spring.mass ?? 1,
    });
    onIndexChange?.(items[idx]);
  }, [
    initialImageOrder,
    count,
    indexToX,
    items,
    onIndexChange,
    spring,
    x,
    computeRange,
  ]);

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
      setIsDragging?.(false);
    },
    [snapToIndex, x, xToIndex, setIsDragging],
  );

  useEffect(() => {
    let raf = 0;
    const unsub = x.on('change', (val) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = clamp(xToIndex(val), 0, count - 1);
        const next = computeRange(center);
        setRange((prev) =>
          prev.start === next.start && prev.end === next.end ? prev : next,
        );
      });
    });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      unsub?.();
    };
  }, [x, xToIndex, count, computeRange]);

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

  // 드래그 제약
  const dragConstraints = { left: leftMax, right: rightMax };

  // 윈도 범위 기반 스페이서 폭
  const leftSpacerW = range.start * pitch;
  const rightSpacerW = Math.max(0, (count - (range.end + 1)) * pitch);

  return (
    <div
      ref={viewportRef}
      className='relative flex w-full items-center justify-center overflow-hidden select-none'
      aria-roledescription='carousel'
      role='region'
    >
      <motion.div
        className='flex shrink-0 items-center'
        style={{ x }}
        drag={draggable ? 'x' : false}
        dragElastic={0.2}
        dragMomentum={false}
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
        onDragStart={() => setIsDragging?.(true)}
      >
        <div style={{ width: leftSpacerW, height: 1 }} />

        {items.slice(range.start, range.end + 1).map((item, i) => {
          const realIndex = range.start + i;
          const isLast = i === range.end - range.start;
          return (
            <div
              key={realIndex}
              style={{
                width: itemWidth,
                marginRight: isLast ? 0 : gap,
              }}
              aria-label={`Item ${realIndex + 1} of ${count}`}
              onClick={() => snapToIndex(realIndex)}
              className='cursor-pointer'
            >
              {renderItem(item, realIndex)}
            </div>
          );
        })}

        {/* 오른쪽 스페이서 */}
        <div style={{ width: rightSpacerW, height: 1 }} />
      </motion.div>
    </div>
  );
}

// 유틸
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
