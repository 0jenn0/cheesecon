import { ComponentPropsWithRef } from 'react';
import { cva } from 'class-variance-authority';
import { Icon } from '@/shared/ui/display';
import { ICON_NAMES } from '@/shared/ui/icon/config';

const PROVIDER_TEXT = {
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

export const LOGIN_PROVIDER = ['google', 'kakao', 'naver'] as const;
export type LoginProvider = (typeof LOGIN_PROVIDER)[number];

export const loginButtonVariants = cva(
  'tablet:max-w-[460px] border-radius-xl padding-x-12 padding-y-8 flex w-full items-center justify-center',
  {
    variants: {
      provider: {
        google: 'border-secondary bg-primary border',
        kakao: 'bg-[#FEE500]',
        naver: 'bg-[#03C75A]',
      },
    },
  },
);

export interface LoginButtonProps extends ComponentPropsWithRef<'button'> {
  provider: LoginProvider;
  onClick: () => void;
}

export default function LoginButton({
  provider,
  onClick,
  ...props
}: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={loginButtonVariants({ provider })}
    >
      <Icon name={PROVIDER_TEXT[provider].icon} size={32} />
      <span className='flex-1 justify-center font-semibold'>
        {PROVIDER_TEXT[provider].text}로 로그인
      </span>
    </button>
  );
}
