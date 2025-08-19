'use client';

import { useCallback } from 'react';
import {
  EMOTICON_CONFIG,
  EmoticonPlatform,
  EmoticonType,
} from '@/feature/register-emoticon/config/emoticon-config';
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

export default function EmoticonGrid({
  isOrderChangeMode,
  isMultiSelectedMode,
}: {
  isOrderChangeMode: boolean;
  isMultiSelectedMode: boolean;
}) {
  const reorder = useDraft((store) => store.reorder);
  const platform = useDraft((store) => store.meta.platform) as EmoticonPlatform;
  const type = useDraft((store) => store.meta.type) as EmoticonType;

  const emoticonCount =
    EMOTICON_CONFIG[platform ?? 'kakaotalk'][type ?? 'animated'].count;

  const imageSize =
    EMOTICON_CONFIG[platform ?? 'kakaotalk'][type ?? 'animated'].size;

  const allSlots = Array.from({ length: emoticonCount }, (_, i) => i + 1);

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
              imageSize={imageSize}
              showCheckbox={isMultiSelectedMode}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
