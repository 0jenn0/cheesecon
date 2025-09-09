import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginScreen from '@/screen/login/login-screen';

export const metadata: Metadata = {
  title: '로그인',
  description:
    '이모티콘 피드백 커뮤니티 치즈콘에 로그인하여 피드백을 받아보세요!',
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
      '이모티콘 피드백 커뮤니티 치즈콘에 로그인하여 피드백을 받아보세요!',
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
