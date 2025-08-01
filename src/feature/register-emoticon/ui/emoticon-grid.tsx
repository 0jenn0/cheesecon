'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/input';
import GridItem from './grid-item';

export default function EmoticonGrid() {
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [isOrderChange, setIsOrderChange] = useState(false);

  const handleMultipleSelect = () => {
    setIsMultipleSelect(!isMultipleSelect);
  };

  const handleOrderChange = () => {
    setIsOrderChange(!isOrderChange);
  };

  return (
    <section className='bg-primary padding-24 border-radius-xl flex w-full flex-col gap-24'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-heading-sm'>이모티콘 목록</h2>
        <div className='flex gap-24'>
          {isOrderChange ? (
            <div className='flex gap-8'>
              <Button
                variant='secondary'
                styleVariant='outlined'
                textClassName='text-body-sm font-semibold'
                onClick={handleOrderChange}
              >
                취소
              </Button>
              <Button
                variant='primary'
                textClassName='text-body-sm font-semibold'
                onClick={handleOrderChange}
              >
                저장
              </Button>
            </div>
          ) : (
            <Button
              variant='secondary'
              textClassName='text-body-sm font-semibold'
              onClick={handleOrderChange}
            >
              순서 바꾸기
            </Button>
          )}
          <Button
            variant='secondary'
            textClassName='text-body-sm font-semibold'
            onClick={handleMultipleSelect}
            disabled={isOrderChange}
          >
            다중 선택
          </Button>
        </div>
      </div>

      <div className='border-ghost border-b' />
      <div className='tablet:grid-cols-6 grid grid-cols-4 gap-16'>
        {Array.from({ length: 24 }).map((_, index) => (
          <GridItem
            key={index}
            imageNumber={index + 1}
            showCheckbox={isMultipleSelect}
            showGripIcon={isOrderChange}
          />
        ))}
      </div>
    </section>
  );
}
