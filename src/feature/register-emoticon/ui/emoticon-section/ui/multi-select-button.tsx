import { useModal } from '@/shared/ui/feedback';
import { Button } from '@/shared/ui/input';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';

export default function MultiSelectButton({
  isMultiSelectedMode = false,
  toggleMultiSelectedMode,
}: {
  isMultiSelectedMode?: boolean;
  toggleMultiSelectedMode: () => void;
}) {
  const { openModal } = useModal();
  const selectedImageIds = useDraft((store) => store.selectedImageIds);
  const toggleSelectedImage = useDraft((store) => store.toggleSelectedImage);
  const removeImage = useDraft((store) => store.removeImage);

  const handleDelete = (imageId: string) => {
    removeImage(imageId);
    toggleSelectedImage(imageId);
  };

  const handleClickCancel = () => {
    toggleMultiSelectedMode();
  };

  const handleDeleteSelectedItems = () => {
    openModal('deleteConfirm', {
      imageIds: selectedImageIds,
      onDelete: handleDelete,
    });
    toggleMultiSelectedMode();
  };

  return (
    <>
      {!isMultiSelectedMode ? (
        <Button
          variant='secondary'
          textClassName='text-body-sm font-semibold'
          className='tablet:w-fit w-full'
          onClick={toggleMultiSelectedMode}
        >
          다중 선택
        </Button>
      ) : (
        <div className='tablet:w-fit flex w-full gap-8'>
          <Button
            variant='secondary'
            styleVariant='outlined'
            textClassName='text-body-sm font-semibold'
            className='tablet:w-fit w-full'
            onClick={handleClickCancel}
          >
            취소
          </Button>
          <Button
            variant='danger'
            styleVariant='outlined'
            textClassName='text-body-sm font-semibold'
            className='tablet:w-fit w-full'
            onClick={handleDeleteSelectedItems}
            disabled={selectedImageIds.length === 0}
          >
            선택 삭제
          </Button>
        </div>
      )}
    </>
  );
}
