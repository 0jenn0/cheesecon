'use client';

import { useEffect } from 'react';
import { useModal } from '@/shared/ui/feedback/modal/modal-provider';
import { EmoticonImage, EmoticonSetDetail } from '@/entity/emoticon-set/type';

export default function EmoticonModalScreen({
  emoticonImage: initialEmoticonImage,
  emoticonSet: initialEmoticonSet,
}: {
  emoticonImage: EmoticonImage | null;
  emoticonSet: EmoticonSetDetail;
}) {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal('viewEmoticonImage', {
      emoticonImage: initialEmoticonImage,
      emoticonSet: initialEmoticonSet,
    });
  };

  useEffect(() => {
    handleOpenModal();
  }, []);

  return <div></div>;
}
