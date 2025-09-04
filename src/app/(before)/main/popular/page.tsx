import type { Metadata } from 'next';
import { getPopularEmoticonSetsCached } from '@/entity/emoticon-set/model/main-cache';
import {
  EmoticonViewSectionClient,
  EmoticonViewSectionServer,
} from '@/feature/view-emotion/emoticon-view-section';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '치즈콘 | 🔥 인기 급상승 이모티콘',
  description:
    '커뮤니티에서 가장 많은 사랑을 받고 있는 이모티콘들을 만나보세요. 좋아요와 피드백이 가장 많은 인기작들을 모았습니다.',
  keywords: [
    '인기 이모티콘',
    '좋아요 많은 이모티콘',
    '피드백',
    '커뮤니티 인기',
    '트렌딩',
  ],
  openGraph: {
    title: '치즈콘 | 🔥 인기 급상승 이모티콘',
    description:
      '커뮤니티에서 가장 많은 사랑을 받고 있는 이모티콘들을 만나보세요. 좋아요와 피드백이 가장 많은 인기작들을 모았습니다.',
    url: 'https://cheesecon.kr/main/popular',
  },
  alternates: {
    canonical: 'https://cheesecon.kr/main/popular',
  },
};

const LIMIT = 12;

export default async function PopularPage() {
  const initial = await getPopularEmoticonSetsCached({
    limit: LIMIT,
    offset: 0,
    orderBy: 'likes_count',
    order: 'desc',
  });

  const flattenedData = initial?.success ? initial.data.data : [];

  return (
    <section className='bg-primary padding-16 flex w-full flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>🔥 인기 급상승 이모티콘</h1>
      </div>
      <div className='border-ghost w-full border-b' />
      <EmoticonViewSectionServer initial={flattenedData} />
      {flattenedData.length > LIMIT && (
        <EmoticonViewSectionClient limit={LIMIT} offset={LIMIT} />
      )}
    </section>
  );
}
