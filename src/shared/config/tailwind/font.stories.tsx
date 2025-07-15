import React from 'react';

const FONT_GROUPS = [
  {
    group: 'Display',
    items: [
      { className: 'text-display-lg', label: 'Display Large' },
      { className: 'text-display-md', label: 'Display Medium' },
      { className: 'text-display-sm', label: 'Display Small' },
    ],
  },
  {
    group: 'Headline',
    items: [
      { className: 'text-headline-lg', label: 'Headline Large' },
      { className: 'text-headline-md', label: 'Headline Medium' },
      { className: 'text-headline-sm', label: 'Headline Small' },
    ],
  },
  {
    group: 'Title',
    items: [
      { className: 'text-title-lg', label: 'Title Large' },
      { className: 'text-title-md', label: 'Title Medium' },
      { className: 'text-title-sm', label: 'Title Small' },
    ],
  },
  {
    group: 'Body',
    items: [
      { className: 'text-body-lg', label: 'Body Large' },
      { className: 'text-body-md', label: 'Body Medium' },
      { className: 'text-body-sm', label: 'Body Small' },
    ],
  },
  {
    group: 'Label',
    items: [
      { className: 'text-label-lg', label: 'Label Large' },
      { className: 'text-label-md', label: 'Label Medium' },
      { className: 'text-label-sm', label: 'Label Small' },
    ],
  },
];

export default {
  title: 'Design Tokens/Font',
  component: () => null,
};

export const AllFontStyles = () => (
  <div className='mx-auto max-w-7xl p-8'>
    <div className='mb-8'>
      <h1 className='text-headline-md mb-2 text-gray-900'>
        Design Tokens - Font
      </h1>
      <p className='text-body-sm text-gray-600'>
        애플리케이션 전반에서 사용되는 폰트 토큰입니다. Pretendard 폰트와 다양한
        텍스트 스타일을 확인할 수 있습니다.
      </p>
    </div>
    <div className='flex flex-col gap-8'>
      {FONT_GROUPS.map(({ group, items }) => (
        <div key={group} className='flex flex-col gap-8'>
          <div className='mb-2 flex items-center gap-2'>
            <h2 className='text-title-lg'>{group}</h2>
            <div className='h-px w-full bg-gray-500' />
          </div>
          {items.map(({ className, label }) => (
            <div key={className} className='flex items-center gap-4'>
              <div className='flex flex-col gap-2'>
                <span className='min-w-[140px] text-gray-800'>{label}</span>
                <span className='text-label-md text-gray-700'>{className}</span>
              </div>
              <span className={className}>
                이모티콘 피드백 플랫폼 치즈콘 (Cheesecon)
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
