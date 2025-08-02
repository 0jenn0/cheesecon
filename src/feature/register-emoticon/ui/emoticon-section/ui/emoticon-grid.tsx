import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import GridItem from '../../grid-item';

interface GridItemData {
  imageNumber: number;
  imageUrl?: string;
}

interface EmoticonGridProps {
  items: GridItemData[];
  isMultipleSelect: boolean;
  isOrderChange: boolean;
  handleDragEnd: (event: DragEndEvent) => void;
  handleImageUpload: (imageNumber: number, preview: string) => void;
}

export default function EmoticonGrid({
  items,
  isMultipleSelect,
  isOrderChange,
  handleDragEnd,
  handleImageUpload,
}: EmoticonGridProps) {
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
              showCheckbox={isMultipleSelect}
              showGripIcon={isOrderChange}
              isDraggable={isOrderChange}
              onImageUpload={handleImageUpload}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
