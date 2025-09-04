import type { Metadata } from 'next';
import MyEmoticonScreen from '@/screen/my/my-emoticon-screen';

export const metadata: Metadata = {
  title: '내 이모티콘',
  description: '내가 만든 이모티콘들을 관리하고 편집하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyEmoticonPage() {
  return <MyEmoticonScreen />;
}
