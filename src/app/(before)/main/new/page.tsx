import type { Metadata } from 'next';
import { getNewEmoticonSetsCached } from '@/entity/emoticon-set/model/main-cache';
import {
  EmoticonViewSectionClient,
  EmoticonViewSectionServer,
} from '@/feature/view-emotion/emoticon-view-section';

export const revalidate = 300;

export const metadata: Metadata = {
  title: '✨ 따끈따끈 최신 이모티콘',
  description:
    '크리에이터들이 방금 업로드한 따끈따끈한 이모티콘들을 만나보세요. 첫 번째 피드백을 남겨주세요!',
  keywords: [
    '최신 이모티콘',
    '신규 업로드',
    '크리에이터',
    '첫 피드백',
    '새로운 작품',
  ],
  openGraph: {
    title: '✨ 따끈따끈 최신 이모티콘 | 치즈콘',
    description:
      '크리에이터들이 방금 업로드한 따끈따끈한 이모티콘들을 만나보세요. 첫 번째 피드백을 남겨주세요!',
    url: 'https://cheesecon.kr/main/new',
  },
  alternates: {
    canonical: 'https://cheesecon.kr/main/new',
  },
};

const LIMIT = 12;

export default async function NewPage() {
  const initial = await getNewEmoticonSetsCached({
    limit: LIMIT,
    offset: 0,
    orderBy: 'created_at',
    order: 'desc',
  });

  const flattenedData = initial?.success ? initial.data.data : [];

  return (
    <section className='bg-primary padding-16 flex w-full flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>✨ 따끈따끈 최신 이모티콘</h1>
      </div>
      <div className='border-ghost w-full border-b' />
      <EmoticonViewSectionServer initial={flattenedData} />
      {flattenedData.length > LIMIT && (
        <EmoticonViewSectionClient limit={LIMIT} offset={LIMIT} />
      )}
    </section>
  );
}
