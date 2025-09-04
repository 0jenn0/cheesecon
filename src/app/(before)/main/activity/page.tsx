import type { Metadata } from 'next';
import { getActivityUsersCached } from '@/entity/profile/model/main-cache';
import {
  ProfileViewSectionClient,
  ProfileViewSectionServer,
} from '@/feature/view-profile';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '🎨 열활하시는 작가님들',
  description:
    '활발하게 활동하고 있는 이모티콘 크리에이터들을 만나보세요. 다양한 작가들의 작품과 스타일을 탐험해보세요.',
  keywords: ['이모티콘 작가', '크리에이터', '활동', '작가 프로필', '커뮤니티'],
  openGraph: {
    title: '🎨 열활하시는 작가님들 | 치즈콘',
    description:
      '활발하게 활동하고 있는 이모티콘 크리에이터들을 만나보세요. 다양한 작가들의 작품과 스타일을 탐험해보세요.',
    url: 'https://cheesecon.kr/main/activity',
  },
  alternates: {
    canonical: 'https://cheesecon.kr/main/activity',
  },
};

const LIMIT = 8;

export default async function ActivityPage() {
  const initial = await getActivityUsersCached({
    limit: 8,
    offset: 0,
  });

  const flattenedData = initial?.success ? initial.data.data : [];

  return (
    <section className='bg-primary padding-16 flex w-full flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-heading-md'>🎨 열활하시는 작가님들</h1>
      </div>
      <div className='border-ghost w-full border-b' />
      <ProfileViewSectionServer initial={flattenedData} />
      {flattenedData.length > LIMIT && (
        <ProfileViewSectionClient offset={LIMIT} />
      )}
    </section>
  );
}
