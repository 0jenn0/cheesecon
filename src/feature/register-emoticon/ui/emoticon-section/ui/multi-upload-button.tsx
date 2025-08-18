'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProgressBar from '@/shared/ui/feedback/progress-bar/progress-bar';
import { useToast } from '@/shared/ui/feedback/toast/toast-provider';
import { Button } from '@/shared/ui/input';
import { useUploadImageToBucketMutation } from '@/feature/upload-image/model/upload-image-mutation';

export default function MultiUploadButton() {
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
        console.log('No files to upload');
        return;
      }

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
          const { url, blurUrl, webpUrl } = result.data;

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

      // input 초기화
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
