import type { Metadata } from 'next';
import EmoticonFormScreen from '@/screen/emoticon-form/screen';

export const metadata: Metadata = {
  title: '이모티콘 업로드',
  description:
    '나만의 이모티콘을 업로드하고 커뮤니티의 피드백을 받아보세요. 크리에이터로서 첫 걸음을 시작해보세요!',
  keywords: [
    '이모티콘 업로드',
    '크리에이터',
    '이모티콘 등록',
    '피드백 받기',
    '작품 공유',
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmoticonRegisterPage() {
  return <EmoticonFormScreen action='create' />;
}
