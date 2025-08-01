'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/input';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import GridItem from './grid-item';

interface GridItemData {
  imageNumber: number;
  preview?: string;
}

export default function EmoticonGrid() {
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [isOrderChange, setIsOrderChange] = useState(false);
  const [items, setItems] = useState<GridItemData[]>(
    Array.from({ length: 24 }, (_, i) => ({
      imageNumber: i + 1,
      preview: '',
    })),
  );

  const handleMultipleSelect = () => {
    setIsMultipleSelect(!isMultipleSelect);
  };

  const handleOrderChange = () => {
    setIsOrderChange(!isOrderChange);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over?.id) {
      setItems((items) => {
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
    }
  };

  const handleImageUpload = (imageNumber: number, preview: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.imageNumber === imageNumber ? { ...item, preview } : item,
      ),
    );
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
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.imageNumber)}
          strategy={rectSortingStrategy}
        >
          <div className='tablet:grid-cols-6 grid grid-cols-4 gap-16'>
            {items.map((item, index) => (
              <GridItem
                key={item.imageNumber}
                id={item.imageNumber}
                imageNumber={index + 1}
                showCheckbox={isMultipleSelect}
                showGripIcon={isOrderChange}
                isDraggable={isOrderChange}
                onImageUpload={(preview) =>
                  handleImageUpload(item.imageNumber, preview)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}
