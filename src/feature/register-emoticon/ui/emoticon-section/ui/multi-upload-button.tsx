'use client';

import { useEffect, useRef, useState } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const headerElement = window.document.querySelector('header');
    setHeaderHeight(headerElement?.clientHeight);
  }, []);

  const handleFileUpload = async (acceptedFiles: File[]) => {
    setCurrentUploadCount({
      current: 0,
      total: acceptedFiles.length,
    });
    setIsUploading(true);

    for (const [index, file] of acceptedFiles.entries()) {
      const formData = new FormData();
      formData.append('file', file);

      const currentEmoticonItems = items.every((item) => item.imageUrl === '')
        ? items
        : items.filter((item) => item.imageUrl === '');

      const imageNumber = currentEmoticonItems[0 + index].imageNumber;

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

        // TODO: 토스트로 성공처리
        console.log('Upload successful:', result);
        setCurrentUploadCount((prev) => ({
          current: prev.current + 1,
          total: prev.total,
        }));
        // TODO: 이미지 업로드 성공 후 리다이렉팅 추가
      } catch (error) {
        // TODO: 토스트로 에러처리
        console.error('Upload error:', error);
      }
    }
    setIsUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: true,
    maxFiles: 32,
    noClick: true,
  });

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(Array.from(files));
    }
    event.target.value = '';
  };

  return (
    <div {...getRootProps()}>
      {isUploading && (
        <ProgressBar
          className='fixed left-0 w-full'
          style={{
            top: headerHeight ? `${headerHeight}px` : '56px',
          }}
          current={currentUploadCount.current}
          total={currentUploadCount.total}
        />
      )}
      <input {...getInputProps()} />

      <input
        ref={fileInputRef}
        type='file'
        accept='image/png,image/jpeg,image/gif,image/webp'
        multiple
        onChange={handleFileChange}
        className='hidden'
      />

      <Button
        variant='primary'
        textClassName='text-body-sm font-semibold'
        className='tablet:w-fit w-full'
        leadingIcon='image-plus'
        onClick={handleFileSelect}
      >
        다중 업로드
      </Button>
    </div>
  );
}
