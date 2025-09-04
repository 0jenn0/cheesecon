import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 정보',
  description: '내 프로필과 계정 정보를 확인하고 관리하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MePage() {
  return <></>;
}
