import { useCallback, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import GridItem from '../../grid-item';
import useEmoticonContext from '../provider/emotion-provider';
import useUIContext from '../provider/ui-provider';

export default function EmoticonGrid() {
  const { items, handleEmoticonItem } = useEmoticonContext();

  const handleImageUpload = useCallback(
    (imageNumber: number, imageUrl: string) => {
      handleEmoticonItem(imageNumber, 'UPLOAD', { imageUrl });
    },
    [handleEmoticonItem],
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      handleEmoticonItem(Number(active.id), 'CHANGE_ORDER', {
        newImageNumber: Number(over.id),
      });
    }
  }, []);

  return (
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
              onImageUpload={handleImageUpload}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
