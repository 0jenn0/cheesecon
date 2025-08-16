'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@/shared/ui/display';
import { Button } from '@/shared/ui/input';
import { useGetProfile } from '@/entity/profile/query/profile-query';

export default function HelloSection() {
  const greeting = useTimeBasedGreeting();
  const { data } = useGetProfile();
  const router = useRouter();

  return (
    <section className='padding-16 bg-primary tablet:border-radius-xl flex w-full flex-col justify-between gap-24'>
      <div className='flex items-center gap-16'>
        <Icon name='logo' className='icon-ghost h-[60px] w-[60px]' />

        <div className='flex flex-col gap-8'>
          <h1 className='text-body-lg font-semibold'>
            {data?.success ? data.data.nickname : ''} 작가님, 안녕하세요!
          </h1>
          <p className='text-secondary'>{greeting}</p>
        </div>
      </div>

      <Button
        variant='primary'
        leadingIcon='edit'
        textClassName='font-semibold'
        onClick={() => {
          router.push('/register');
        }}
      >
        새 이모티콘 등록하기
      </Button>
    </section>
  );
}

export const TIME_BASED_GREETINGS = {
  dawn: [
    '밤늦게까지 이모티콘 제작에 열정을 쏟고 계시는군요!',
    '새벽 감성으로 만드는 이모티콘은 특별할 거예요!',
    '이른 새벽까지 창작 활동하시는 열정이 대단해요!',
    '밤하늘의 별처럼 반짝이는 이모티콘을 만들어보세요!',
    '고요한 새벽 시간, 집중력이 최고일 때네요!',
  ],

  morning: [
    '좋은 아침이에요!',
    '상쾌한 아침이네요!',
    '아침 햇살처럼 밝은 이모티콘을 만들어보세요!',
    '모닝커피와 함께 영감 가득한 창작 시간 보내세요!',
    '이른 아침부터 열정적이시네요!',
    '아침 공기처럼 신선한 아이디어가 떠오르길!',
  ],

  afternoon: [
    '점심시간에도 창작 열정이 멈추지 않네요!',
    '오후 햇살처럼 따뜻한 이모티콘을 만들어보세요!',
    '바쁜 오후에도 틈틈이 이모티콘 제작하시는 모습이 멋져요!',
    '점심 후 졸음은 창작으로 이겨내세요!',
    '오후의 여유로운 시간, 편안한 마음으로 만들어보세요!',
    '점심 드시고 에너지 충전하셨나요?',
  ],

  evening: [
    '하루 일과를 마치고 여유롭게 이모티콘 제작하시는군요!',
    '저녁노을처럼 따뜻한 이모티콘 어떠세요?',
    '저녁 시간의 여유로움이 좋은 작품을 만들어낼 거예요!',
    '하루의 마무리를 이모티콘 제작으로!',
    '저녁 식사는 맛있게 드셨나요?',
    '일과 후 힐링 타임이네요!',
  ],

  night: [
    '늦은 밤까지 창작 활동하시는 열정이 대단해요!',
    '밤의 고요함 속에서 탄생하는 이모티콘은 더 특별할 거예요!',
    '오늘 하루도 수고 많으셨어요!',
    '밤늦게까지 노고가 많으세요!',
    '야심한 시간까지 창작하시는 모습이 멋져요!',
  ],
} as const;

export function getTimeBasedGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  let greetingArray: readonly string[];

  if (hour >= 0 && hour < 6) {
    greetingArray = TIME_BASED_GREETINGS.dawn;
  } else if (hour >= 6 && hour < 12) {
    greetingArray = TIME_BASED_GREETINGS.morning;
  } else if (hour >= 12 && hour < 18) {
    greetingArray = TIME_BASED_GREETINGS.afternoon;
  } else if (hour >= 18 && hour < 23) {
    greetingArray = TIME_BASED_GREETINGS.evening;
  } else {
    greetingArray = TIME_BASED_GREETINGS.night;
  }

  const randomIndex = Math.floor(Math.random() * greetingArray.length);
  return greetingArray[randomIndex];
}

export function useTimeBasedGreeting() {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());

    const interval = setInterval(
      () => {
        setGreeting(getTimeBasedGreeting());
      },
      60 * 60 * 1000,
    );
    return () => clearInterval(interval);
  }, []);

  return greeting;
}
