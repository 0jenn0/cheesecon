'use client';

import { useState } from 'react';
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
  const uploadImageMutation = useUploadImageMutation();
  const { handleEmoticonItem, items } = useEmoticonContext();
  const { handleSetImageUrl } = useEmoticonRegister();

  const headerElement = window.document.querySelector('header');
  const headerHeight = headerElement?.clientHeight;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
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
      // 여기에 파일 처리 로직을 추가할 수 있습니다
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: true,
    maxFiles: 32,
  });

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
      <Button
        variant='primary'
        textClassName='text-body-sm font-semibold'
        className='tablet:w-fit w-full'
        leadingIcon='image-plus'
      >
        다중 업로드
      </Button>
    </div>
  );
}
