'use client';

import { useCallback, useMemo } from 'react';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import EmoticonGridItem from '../../emotcion-grid-item';

const EMOTICON_COUNT = 2;

export default function EmoticonGrid({
  isOrderChangeMode,
}: {
  isOrderChangeMode: boolean;
}) {
  const reorder = useDraft((store) => store.reorder);

  const allSlots = useMemo(
    () => Array.from({ length: EMOTICON_COUNT }, (_, i) => i + 1),
    [],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      const fromSlot = Number(active.id);
      const toSlot = Number(over.id);
      if (fromSlot === toSlot) return;
      reorder(fromSlot, toSlot);
    },
    [reorder],
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={allSlots} strategy={rectSortingStrategy}>
        <div className='tablet:grid-cols-6 grid grid-cols-4 gap-16'>
          {allSlots.map((slot, index) => (
            <EmoticonGridItem
              key={slot}
              imageOrder={index + 1}
              showGrip={isOrderChangeMode}
              isDragMode={isOrderChangeMode}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
