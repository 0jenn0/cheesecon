import { getPopularEmoticonSetsCached } from '@/entity/emoticon-set/model/main-cache';
import { PopularScreen } from '@/screen';
import { HelloSection } from '@/screen/main/ui';

export default async function PopularPage() {
  const initial = await getPopularEmoticonSetsCached({
    limit: 8,
    offset: 0,
    orderBy: 'likes_count',
    order: 'desc',
  });

  return (
    <div className='tablet:gap-24 flex w-full flex-col gap-16'>
      <HelloSection />
      <PopularScreen initial={initial} />
    </div>
  );
}
