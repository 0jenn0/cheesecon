import { getEmoticonImages } from '@/entity/emoticon-images/api';
import { EmoticonImage } from '@/entity/emoticon-set/type';

export default async function ImageBatch({
  setId,
  limit,
  offset,
  isUnlocked,
  Wrapper,
}: {
  setId: string;
  limit: number;
  offset: number;
  isUnlocked: boolean;
  Wrapper: React.ComponentType<{
    image: EmoticonImage;
    isUnlocked: boolean;
  }>;
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
        gap: '16px',
      }}
    >
      {emoticonImages?.map((image) => (
        <li key={image.id}>
          <Wrapper image={image} isUnlocked={isUnlocked} />
        </li>
      ))}
    </ul>
  );
}
