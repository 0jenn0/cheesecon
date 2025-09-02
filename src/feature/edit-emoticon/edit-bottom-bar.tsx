'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/shared/ui/input';
import { useUpdateMutation } from '@/entity/emoticon-set/query/emoticon-set-mutation';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';

export function EditBottomBar({ id }: { id: string }) {
  const updateMutation = useUpdateMutation(id);

  const emoticonSetInfo = useDraft((store) => store.meta);
  const getAllImages = useDraft((store) => store.getAllImages);
  const validateAll = useDraft((store) => store.validateAll);
  const metaErrors = useDraft((store) => store.metaErrors);
  const byOrderOriginal = useDraft((store) => store.byOrderOriginal);

  const [validateResult, setValidateResult] = useState({ success: false });

  useEffect(() => {
    const result = validateAll();
    setValidateResult(result);
  }, [validateAll, emoticonSetInfo, byOrderOriginal, metaErrors]);

  const handleEdit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const currentAllImages = getAllImages();

      updateMutation.mutateAsync({
        emoticonSet: {
          id,
          ...emoticonSetInfo,
        },
        imageUrls: currentAllImages,
      });
    },
    [emoticonSetInfo, getAllImages, updateMutation, id],
  );

  return (
    <form
      className='fixed right-0 bottom-0 left-0 flex items-center justify-end bg-white/60 px-24 py-16 backdrop-blur-lg'
      onSubmit={handleEdit}
    >
      <Button
        textClassName='text-body-lg font-semibold'
        className='padding-32'
        type='submit'
        disabled={!validateResult.success}
        isLoading={updateMutation.isPending}
      >
        수정하기
      </Button>
    </form>
  );
}
