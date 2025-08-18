'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProgressBar from '@/shared/ui/feedback/progress-bar/progress-bar';
import { useToast } from '@/shared/ui/feedback/toast/toast-provider';
import { Button } from '@/shared/ui/input';
import { useDraft } from '@/feature/register-emoticon/model/draft-context';
import { useUploadImageToBucketMutation } from '@/feature/upload-image/model/upload-image-mutation';

export default function MultiUploadButton() {
  const addImages = useDraft((store) => store.addImages);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUploadCount, setCurrentUploadCount] = useState({
    current: 0,
    total: 0,
  });
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(
    undefined,
  );
  const uploadImageMutation = useUploadImageToBucketMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const headerElement = window.document.querySelector('header');
    setHeaderHeight(headerElement?.clientHeight);
  }, []);

  const handleFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) {
        addToast({
          type: 'error',
          message: '파일을 선택해주세요.',
        });
        return;
      }

      // FIXME : 선택된 type에 따라 수정
      const filesToUpload = files.slice(0, 32);

      if (filesToUpload.length < files.length) {
        addToast({
          type: 'error',
          message: `최대 32개의 이모티콘만 업로드 가능합니다. ${filesToUpload.length}개 파일만 업로드됩니다.`,
        });
      }

      setCurrentUploadCount({
        current: 0,
        total: filesToUpload.length,
      });
      setIsUploading(true);

      for (const [index, file] of filesToUpload.entries()) {
        const formData = new FormData();

        formData.append('file', file);

        const result = await uploadImageMutation.mutateAsync(formData);

        if (result.success) {
          addImages([
            {
              id: crypto.randomUUID(),
              image_url: result.data.url,
              image_order: index + 1,
              blur_url: result.data.blurUrl ?? null,
              webp_url: result.data.webpUrl ?? null,
              is_representative: false,
            },
          ]);

          setCurrentUploadCount((prev) => ({
            current: prev.current + 1,
            total: prev.total,
          }));
        } else {
          setIsUploading(false);
          setCurrentUploadCount({ current: 0, total: 0 });
        }
      }

      setIsUploading(false);
      setCurrentUploadCount({ current: 0, total: 0 });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [uploadImageMutation, addToast],
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
        disabled={isUploading}
      />

      <>
        <Button
          variant='primary'
          textClassName='text-body-sm font-semibold'
          className='tablet:w-fit tablet:flex hidden w-full'
          leadingIcon='image-plus'
          onClick={handleButtonClick}
          disabled={isUploading}
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
