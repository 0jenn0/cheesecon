import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginScreen from '@/screen/login/login-screen';

export const metadata: Metadata = {
  title: '로그인',
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
    title: '로그인',
    description:
      '커뮤니티에서 가장 많은 사랑을 받고 있는 이모티콘들을 만나보세요. 좋아요와 피드백이 가장 많은 인기작들을 모았습니다.',
    url: 'https://cheesecon.kr/login',
  },
  alternates: {
    canonical: 'https://cheesecon.kr/login',
  },
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginScreen />
    </Suspense>
  );
}
