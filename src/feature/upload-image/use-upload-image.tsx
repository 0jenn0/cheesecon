import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';

interface UseImageUploadOptions {
  maxSize?: number; // 최대 파일 크기 (bytes)
  maxFiles?: number; // 최대 파일 개수
  acceptedFormats?: string[]; // 허용할 이미지 형식
  onUpload?: (files: File[]) => void; // 업로드 콜백
  onError?: (error: string) => void; // 에러 콜백
}

interface UseImageUploadReturn {
  files: File[];
  previews: string[];
  isDragging: boolean;
  isUploading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

const DEFAULT_ACCEPTED_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB

export const useImageUpload = (
  options: UseImageUploadOptions = {},
): UseImageUploadReturn => {
  const {
    maxSize = DEFAULT_MAX_SIZE,
    maxFiles = 10,
    acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
    onUpload,
    onError,
  } = options;

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 유효성 검사
  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return `허용되지 않는 파일 형식입니다: ${file.name}`;
      }
      if (file.size > maxSize) {
        return `파일 크기가 너무 큽니다: ${file.name} (최대 ${(maxSize / 1024 / 1024).toFixed(1)}MB)`;
      }
      return null;
    },
    [acceptedFormats, maxSize],
  );

  // 파일 처리
  const processFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);

      if (files.length + fileArray.length > maxFiles) {
        onError?.(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      const validFiles: File[] = [];
      const errors: string[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      if (errors.length > 0) {
        onError?.(errors.join('\n'));
      }

      if (validFiles.length > 0) {
        setIsUploading(true);
        setFiles((prev) => [...prev, ...validFiles]);

        // 미리보기 생성
        let processedCount = 0;
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews((prev) => [...prev, reader.result as string]);
            processedCount++;

            // 모든 파일이 처리되면 업로드 상태 해제
            if (processedCount === validFiles.length) {
              setIsUploading(false);
            }
          };
          reader.readAsDataURL(file);
        });

        onUpload?.(validFiles);
      }
    },
    [files.length, maxFiles, validateFile, onUpload, onError],
  );

  // Drag & Drop 핸들러
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [processFiles],
  );

  // 파일 선택 핸들러
  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        processFiles(selectedFiles);
      }
      // 같은 파일을 다시 선택할 수 있도록 값 초기화
      e.target.value = '';
    },
    [processFiles],
  );

  // 클릭 핸들러
  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // 파일 제거
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // 모든 파일 제거
  const clearFiles = useCallback(() => {
    setFiles([]);
    setPreviews([]);
  }, []);

  return {
    files,
    previews,
    isDragging,
    isUploading,
    inputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleClick,
    removeFile,
    clearFiles,
  };
};
