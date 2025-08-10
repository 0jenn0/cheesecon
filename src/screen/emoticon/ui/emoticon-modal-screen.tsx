'use client';

import { useCallback, useEffect } from 'react';
import { useModal } from '@/shared/ui/feedback';
import { EmoticonImage, EmoticonSetDetail } from '@/entity/emoticon-set/type';

export default function EmoticonModalScreen({
  emoticonImage: initialEmoticonImage,
  emoticonSet: initialEmoticonSet,
}: {
  emoticonImage: EmoticonImage | null;
  emoticonSet: EmoticonSetDetail;
}) {
  const { openModal } = useModal();

  const handleOpenModal = useCallback(() => {
    openModal('viewEmoticonImage', {
      emoticonImage: initialEmoticonImage,
      emoticonSet: initialEmoticonSet,
    });
  }, [openModal, initialEmoticonImage, initialEmoticonSet]);

  useEffect(() => {
    handleOpenModal();
  }, [handleOpenModal]);

  return <div></div>;
}
