import { getPopularEmoticonSetsCached } from '@/entity/emoticon-set/model/main-cache';
import {
  EmoticonViewSectionClient,
  EmoticonViewSectionServer,
} from '@/feature/view-emotion/emoticon-view-section';

export const revalidate = 3600;

const LIMIT = 12;

export default async function PopularPage() {
  const initial = await getPopularEmoticonSetsCached({
    limit: LIMIT,
    offset: 0,
    orderBy: 'created_at',
    order: 'desc',
  });

  const flattenedData = initial?.success ? initial.data.data : [];

  return (
    <section className='bg-primary padding-24 flex w-full flex-col gap-24'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>✨ 따끈따끈 최신 이모티콘</h1>
      </div>
      <div className='border-ghost w-full border-b' />
      <EmoticonViewSectionServer initial={flattenedData} />
      <EmoticonViewSectionClient limit={LIMIT} offset={LIMIT} />
    </section>
  );
}
