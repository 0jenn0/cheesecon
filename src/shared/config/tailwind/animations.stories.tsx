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
    <div className='space-y-12'>
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
