import { ICON_NAMES } from '@/shared/ui/icon/config';

export const LOGIN_PROVIDER = ['google', 'kakaotalk', 'naver'] as const;
export type LoginProvider = (typeof LOGIN_PROVIDER)[number];

export const PROVIDER_CONFIG = {
  google: {
    text: '구글',
    icon: 'google-login',
  },
  kakao: {
    text: '카카오',
    icon: 'kakao-login',
  },
  naver: {
    text: '네이버',
    icon: 'naver-login',
  },
} satisfies Record<
  LoginProvider,
  { text: string; icon: (typeof ICON_NAMES)[number] }
>;
