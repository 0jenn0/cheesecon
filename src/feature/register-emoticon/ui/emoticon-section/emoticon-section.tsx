'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/shared/ui/input';
import { DragEndEvent } from '@dnd-kit/core';
import useEmoticonRegister from '../../model/hook';
import EmoticonGrid from './ui/emoticon-grid';

const INITIAL_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  imageNumber: i + 1,
  imageUrl: '',
}));

interface GridItemData {
  imageNumber: number;
  imageUrl?: string;
}

export default function EmoticonSection() {
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [isOrderChange, setIsOrderChange] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { handleSetImageUrl } = useEmoticonRegister();

  const [items, setItems] = useState<GridItemData[]>(INITIAL_ITEMS);
  const [newItems, setNewItems] = useState<GridItemData[]>(INITIAL_ITEMS);

  const handleMultipleSelect = () => {
    setIsMultipleSelect(!isMultipleSelect);
  };

  const handleOrderChange = () => {
    setIsOrderChange(true);
    setHasUnsavedChanges(false);
  };

  const handleCancelOrder = () => {
    setNewItems(items);
    setIsOrderChange(false);
    setHasUnsavedChanges(false);
  };

  const handleSaveOrder = () => {
    setItems(newItems);
    setIsOrderChange(false);
    setHasUnsavedChanges(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over?.id) {
      setNewItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.imageNumber === Number(active.id),
        );
        const newIndex = items.findIndex(
          (item) => item.imageNumber === Number(over.id),
        );

        if (oldIndex === -1 || newIndex === -1) {
          return items;
        }

        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        return newItems;
      });

      setHasUnsavedChanges(true);
    }
  };

  const handleImageUpload = useCallback(
    (imageNumber: number, imageUrl: string) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.imageNumber === imageNumber ? { ...item, imageUrl } : item,
        ),
      );
      setNewItems((prevItems) =>
        prevItems.map((item) =>
          item.imageNumber === imageNumber ? { ...item, imageUrl } : item,
        ),
      );
      handleSetImageUrl([
        {
          imageUrl,
          imageOrder: imageNumber,
        },
      ]);
    },

    [],
  );

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
                onClick={handleCancelOrder}
              >
                취소
              </Button>
              <Button
                variant='primary'
                textClassName='text-body-sm font-semibold'
                onClick={handleSaveOrder}
                disabled={!hasUnsavedChanges}
              >
                {hasUnsavedChanges ? '저장' : '저장됨'}
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

      <EmoticonGrid
        items={newItems}
        handleDragEnd={handleDragEnd}
        handleImageUpload={handleImageUpload}
        isMultipleSelect={isMultipleSelect}
        isOrderChange={isOrderChange}
      />
    </section>
  );
}
