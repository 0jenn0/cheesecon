import { ComponentPropsWithRef } from 'react';
import { cva } from 'class-variance-authority';
import { Icon } from '@/shared/ui/display';
import { LOGIN_PROVIDER, type LoginProvider, PROVIDER_CONFIG } from '../config';

export const loginButtonVariants = cva(
  'tablet:max-w-[460px] border-radius-xl padding-x-12 padding-y-8 flex w-full cursor-pointer items-center justify-center',
  {
    variants: {
      provider: {
        google: 'border-secondary bg-primary border',
        kakao: 'bg-[#FEE500] hover:bg-[#FEE500]/80',
        naver: 'bg-[#03C75A] hover:bg-[#03C75A]/80',
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
      <Icon name={PROVIDER_CONFIG[provider].icon} size={32} />
      <span className='flex-1 justify-center font-semibold'>
        {PROVIDER_CONFIG[provider].text}로 로그인
      </span>
    </button>
  );
}
