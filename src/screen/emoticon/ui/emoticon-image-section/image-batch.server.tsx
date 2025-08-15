'use server';

import { getEmoticonImages } from '@/entity/emoticon-images/api';
import EmoticonImageItem from './emoticon-image-item.server';

export default async function ImageBatch({
  setId,
  limit,
  offset,
  isUnlocked,
}: {
  setId: string;
  limit: number;
  offset: number;
  isUnlocked: boolean;
}) {
  const { data: emoticonImages } = await getEmoticonImages(
    setId,
    limit,
    offset,
  );
  const columns = limit;
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '24px',
      }}
    >
      {emoticonImages?.map((image) => (
        <li key={image.id}>
          <EmoticonImageItem image={image} isUnlocked={isUnlocked} />
        </li>
      ))}
    </ul>
  );
}
