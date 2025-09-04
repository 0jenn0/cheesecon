import type { Metadata } from 'next';
import ViewEmoticon from '@/feature/view-activity/view-emoticon';

export const metadata: Metadata = {
  title: '좋아요한 이모티콘',
  description: '내가 좋아요한 이모티콘들을 모아보세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyLikePage() {
  return <ViewEmoticon emoticonType='likes' />;
}
