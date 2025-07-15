import { useState } from 'react';

export default {
  title: 'Design Tokens/Animations',
};

const boxBase =
  'w-32 h-16 flex items-center justify-center rounded-lg shadow bg-white border border-gray-200 text-gray-900 text-base font-normal mb-2';

const animationGroups = [
  {
    label: 'Slide',
    animations: [
      'slide-up',
      'slide-up-fast',
      'slide-up-slow',
      'slide-down',
      'slide-down-fast',
      'slide-down-slow',
      'slide-left',
      'slide-left-fast',
      'slide-left-slow',
      'slide-right',
      'slide-right-fast',
      'slide-right-slow',
    ],
  },
  {
    label: 'Fade',
    animations: [
      'fade-in',
      'fade-in-fast',
      'fade-in-slow',
      'fade-out',
      'fade-out-fast',
      'fade-out-slow',
    ],
  },
  {
    label: 'Scale',
    animations: [
      'scale-in',
      'scale-in-fast',
      'scale-in-slow',
      'scale-out',
      'scale-out-fast',
      'scale-out-slow',
    ],
  },
  {
    label: 'Bounce',
    animations: ['bounce-in', 'bounce-out'],
  },
];

export function AllAnimations() {
  const [active, setActive] = useState<{ [key: string]: boolean }>({});

  const handleAnimate = (name: string) => {
    setActive((prev) => ({ ...prev, [name]: false }));
    setTimeout(() => {
      setActive((prev) => ({ ...prev, [name]: true }));
    }, 10);
  };

  return (
    <div className='mx-auto flex max-w-7xl flex-col gap-8 p-8'>
      <div className='mb-4 flex flex-col gap-2'>
        <h1 className='text-headline-md text-gray-900'>
          Design Tokens - Animations
        </h1>
        <p className='text-body-sm text-gray-600'>
          애플리케이션 전반에서 사용되는 애니메이션 토큰입니다. 버튼을 클릭시
          애니메이션이 재생됩니다.
        </p>
      </div>

      {animationGroups.map((group) => (
        <div key={group.label}>
          <h2 className='mb-4 text-xl font-semibold'>{group.label}</h2>
          <div className='grid grid-cols-4 gap-6'>
            {group.animations.map((name) => (
              <div
                key={name}
                className={`flex cursor-pointer flex-col items-center`}
              >
                <div
                  className={`${boxBase} ${active[name] ? name : ''}`}
                  onClick={() => handleAnimate(name)}
                  onAnimationEnd={() =>
                    setActive((prev) => ({ ...prev, [name]: false }))
                  }
                >
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
