import { useCallback, useState } from 'react';
import { EmoticonImage } from '@/entity/emoticon-set';

export function useImages({
  prev,
  current,
  next,
}: {
  prev: EmoticonImage | null;
  current: EmoticonImage | null;
  next: EmoticonImage | null;
}) {
  const initialImages = [
    ...generateDummyImages({
      start: 0,
      count: prev?.image_order ?? 0,
    }),
    ...[prev, current, next].filter((image) => image !== null),
    ...generateDummyImages({
      start: next?.image_order ?? 0,
      count: 24 - (next?.image_order ?? 0),
    }),
  ];

  const [images, setImages] = useState<EmoticonImage[]>(initialImages);

  const handleSetImages = useCallback(
    (imageId: string, nextImage: EmoticonImage) => {
      setImages((prev) => {
        const index = prev.findIndex((image) => image.id === imageId);
        if (index === -1) return prev;
        const newImages = [...prev];
        newImages[index] = nextImage;
        return newImages;
      });
    },
    [],
  );

  return { images, handleSetImages };
}

function generateDummyImages({
  start,
  count,
}: {
  start: number;
  count: number;
}): EmoticonImage[] {
  return Array(count)
    .fill(null)
    .map((_, i) => ({
      id: `dummy-${i + start}`,
      image_url: `https://via.placeholder.com/200x120?text=Dummy+Image+${i + start}`,
      image_order: i + start,
      blur_url: null,
      comments_count: 0,
      created_at: null,
      is_representative: null,
      likes_count: 0,
      set_id: null,
      webp_url: null,
    }));
}
