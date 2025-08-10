'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProgressBar from '@/shared/ui/feedback/progress-bar/progress-bar';
import { Button } from '@/shared/ui/input';
import useEmoticonRegister from '@/feature/register-emoticon/model/hook';
import { useUploadImageMutation } from '@/feature/upload-image/model/upload-image-mutation';
import useEmoticonContext from '../provider/emotion-provider';

export default function MultiUploadButton() {
  const [isUploading, setIsUploading] = useState(false);
  const [currentUploadCount, setCurrentUploadCount] = useState({
    current: 0,
    total: 0,
  });
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(
    undefined,
  );
  const uploadImageMutation = useUploadImageMutation();
  const { handleEmoticonItem, items } = useEmoticonContext();
  const { handleSetImageUrl } = useEmoticonRegister();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const headerElement = window.document.querySelector('header');
    setHeaderHeight(headerElement?.clientHeight);
  }, []);

  const handleFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) {
        console.log('No files to upload');
        return;
      }

      const emptySlots = items.filter((item) => item.imageUrl === '');
      if (emptySlots.length === 0) {
        // TODO: 토스트 처리
        // console.log('빈 슬롯이 없습니다');
        return;
      }

      const filesToUpload = files.slice(
        0,
        Math.min(files.length, emptySlots.length),
      );

      if (filesToUpload.length < files.length) {
        // TODO: 토스트 처리
        // alert(
        //   `${emptySlots.length}개 슬롯만 사용 가능합니다. ${filesToUpload.length}개 파일만 업로드됩니다.`,
        // );
      }

      setCurrentUploadCount({
        current: 0,
        total: filesToUpload.length,
      });
      setIsUploading(true);

      try {
        for (const [index, file] of filesToUpload.entries()) {
          const formData = new FormData();
          formData.append('file', file);

          const targetSlot = emptySlots[index];
          const imageNumber = targetSlot.imageNumber;

          try {
            const result = await uploadImageMutation.mutateAsync(formData);

            handleEmoticonItem(imageNumber, 'UPLOAD', {
              imageUrl: result.url,
            });

            handleSetImageUrl([
              {
                imageUrl: result.url,
                imageOrder: imageNumber,
              },
            ]);

            setCurrentUploadCount((prev) => ({
              current: prev.current + 1,
              total: prev.total,
            }));

            // TODO: 토스트 처리
            // console.log('Upload successful:', result);
          } catch (error) {
            console.error('Upload error for file:', file.name, error);
            // TODO: 토스트 처리
            // console.error('Upload error for file:', file.name, error);
            // alert(`${file.name} 업로드 실패`);
          }
        }
        // TODO: 토스트 처리
        console.log(`총 ${filesToUpload.length}개 파일 업로드 완료`);
      } finally {
        setIsUploading(false);
        setCurrentUploadCount({ current: 0, total: 0 });

        // input 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [items, uploadImageMutation, handleEmoticonItem, handleSetImageUrl],
  );

  const handleButtonClick = useCallback(() => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [isUploading]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const fileArray = Array.from(files);
        handleFileUpload(fileArray);
      }
    },
    [handleFileUpload],
  );

  const emptySlotCount = items.filter((item) => item.imageUrl === '').length;

  return (
    <div className='relative'>
      {isUploading && (
        <ProgressBar
          className='fixed left-0 z-50 w-full'
          style={{
            top: headerHeight ? `${headerHeight}px` : '56px',
          }}
          current={currentUploadCount.current}
          total={currentUploadCount.total}
        />
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept='image/png,image/jpeg,image/jpg,image/gif,image/webp'
        multiple
        onChange={handleFileChange}
        className='hidden'
        disabled={isUploading || emptySlotCount === 0}
      />

      <>
        <Button
          variant='primary'
          textClassName='text-body-sm font-semibold'
          className='tablet:w-fit tablet:flex hidden w-full'
          leadingIcon='image-plus'
          onClick={handleButtonClick}
          disabled={isUploading || emptySlotCount === 0}
        >
          {isUploading
            ? `업로드 중 (${currentUploadCount.current}/${currentUploadCount.total})`
            : `다중 업로드`}
        </Button>
        <Button
          variant='primary'
          textClassName='text-body-sm font-semibold '
          className='tablet:w-fit tablet:hidden w-full'
          leadingIcon='image-plus'
          onClick={handleButtonClick}
          disabled={true}
        >
          PC 사용시 다중 업로드 가능
        </Button>
      </>
    </div>
  );
}
