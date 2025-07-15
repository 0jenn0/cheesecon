import React from 'react';

const RADIUS_TOKENS = [
  { name: 'radius-sm', value: 'var(--radius-sm)' },
  { name: 'radius-md', value: 'var(--radius-md)' },
];

export default {
  title: 'Design Tokens/Radius',
};

export const AllRadius = () => (
  <div className='mx-auto flex flex-col gap-8 p-8'>
    <h1 className='text-headline-md mb-4 text-gray-900'>
      Design Tokens - Radius
    </h1>
    <div className='flex flex-col gap-6'>
      {RADIUS_TOKENS.map(({ name, value }) => (
        <div key={name} className='flex items-center gap-6'>
          <div
            className='text-label-md flex h-16 w-120 items-center justify-center border border-gray-300 bg-gray-100 font-mono'
            style={{ borderRadius: `var(--${name})` }}
          >
            {name}
          </div>
        </div>
      ))}
    </div>
  </div>
);
