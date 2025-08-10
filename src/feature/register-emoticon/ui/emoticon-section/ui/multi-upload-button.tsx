'use client';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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

  useEffect(() => {
    const headerElement = window.document.querySelector('header');
    setHeaderHeight(headerElement?.clientHeight);
  }, []);

  const handleFileUpload = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      // TODO: 토스트 처리
      console.log('No files to upload');
      return;
    }

    // 업로드 가능한 빈 슬롯 확인
    const emptySlots = items.filter((item) => item.imageUrl === '');
    const maxUploadCount = Math.min(acceptedFiles.length, emptySlots.length);

    if (maxUploadCount === 0) {
      console.log('No empty slots available');
      // TODO: 토스트로 "업로드 가능한 슬롯이 없습니다" 메시지 표시
      return;
    }

    const filesToUpload = acceptedFiles.slice(0, maxUploadCount);

    setCurrentUploadCount({
      current: 0,
      total: filesToUpload.length,
    });
    setIsUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file, index) => {
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

          return { success: true, file: file.name, url: result.url };
        } catch (error) {
          console.error('Upload error for file:', file.name, error);
          return { success: false, file: file.name, error };
        }
      });

      const results = await Promise.all(uploadPromises);

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;

      if (failCount > 0) {
        console.log(`${successCount}개 성공, ${failCount}개 실패`);
        // TODO: 토스트로 부분 실패 메시지 표시
      } else {
        console.log(`${successCount}개 파일 업로드 완료`);
        // TODO: 토스트로 성공 메시지 표시
      }
    } catch (error) {
      console.error('Upload process error:', error);
      // TODO: 토스트로 에러 메시지 표시
    } finally {
      setIsUploading(false);
      setCurrentUploadCount({ current: 0, total: 0 });
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    multiple: true,
    maxFiles: 32,
    noClick: true,
    noKeyboard: true,
    disabled: isUploading,
  });

  const handleButtonClick = () => {
    if (!isUploading) {
      open();
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`relative ${isDragActive ? 'opacity-70' : ''}`}
    >
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

      <input {...getInputProps()} />

      <Button
        variant='primary'
        textClassName='text-body-sm font-semibold'
        className='tablet:w-fit w-full'
        leadingIcon='image-plus'
        onClick={handleButtonClick}
        disabled={isUploading}
        isLoading={isUploading}
      >
        {isUploading ? '업로드 중...' : '다중 업로드'}
      </Button>
    </div>
  );
}
