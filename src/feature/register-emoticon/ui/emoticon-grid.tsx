'use client';

import { useState } from 'react';
import EmoticonItem from '@/shared/ui/display/emoticon-item/emoticon-item';
import { Button } from '@/shared/ui/input';

export default function EmoticonGrid() {
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState<number[]>([]);

  const handleMultipleSelect = () => {
    setIsMultipleSelect(!isMultipleSelect);
  };

  const handleEmoticonSelect = (emoticonNumber: number) => {
    if (selectedEmoticon.includes(emoticonNumber)) {
      setSelectedEmoticon((prev) => prev.filter((id) => id !== emoticonNumber));
    } else {
      setSelectedEmoticon((prev) => [...prev, emoticonNumber]);
    }
  };

  return (
    <section className='bg-primary padding-24 border-radius-xl flex w-full flex-col gap-24'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-heading-sm'>이모티콘 목록</h2>
        <div>
          <Button
            variant='secondary'
            textClassName='text-body-sm font-semibold'
            onClick={handleMultipleSelect}
          >
            다중 선택
          </Button>
        </div>
      </div>

      <div className='border-ghost border-b' />
      <div className='tablet:grid-cols-6 grid grid-cols-4 gap-16'>
        {Array.from({ length: 24 }).map((_, index) => (
          <EmoticonItem
            key={index}
            imageNumber={index + 1}
            showCheckbox={isMultipleSelect}
            isSelected={selectedEmoticon.includes(index + 1)}
            onClick={() => handleEmoticonSelect(index + 1)}
          />
        ))}
      </div>
    </section>
  );
}
