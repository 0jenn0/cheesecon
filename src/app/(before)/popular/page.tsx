import { getPopularSetsCached } from '@/entity/emoticon-set/model/popular-cache';
import { PopularScreen } from '@/screen';
import { HelloSection } from '@/screen/main/ui';

export default async function PopularPage() {
  const initial = await getPopularSetsCached({
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
