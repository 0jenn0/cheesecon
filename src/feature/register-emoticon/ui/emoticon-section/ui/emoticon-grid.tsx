import { useCallback } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import EmoticonGridItem from '../../grid-item';

export default function EmoticonGrid() {
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
    }
  }, []);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={Array.from({ length: 32 }, (_, index) => index)}
        strategy={rectSortingStrategy}
      >
        <div className='tablet:grid-cols-6 grid grid-cols-4 gap-16'>
          {Array.from({ length: 24 }, (_, index) => (
            <EmoticonGridItem
              key={index}
              imageNumber={index + 1}
              image={undefined}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
