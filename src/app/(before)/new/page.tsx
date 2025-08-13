import { getNewEmoticonSetsCached } from '@/entity/emoticon-set/model/main-cache';
import { NewScreen } from '@/screen/main';

export default async function NewPage() {
  const initial = await getNewEmoticonSetsCached({
    limit: 8,
    offset: 0,
    orderBy: 'created_at',
    order: 'desc',
  });

  return <NewScreen initial={initial} />;
}
