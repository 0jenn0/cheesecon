'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

export interface EmoticonItemContextType {
  imageNumber: number;
  imageUrl: string;
  commentsCount: number;
  likesCount: number;

  showCheckbox: boolean;
  showGripIcon: boolean;
  showNumberBadge: boolean;

  isUploading: boolean;
  isDragging: boolean;
}

export const emoticonItemContext = createContext<EmoticonItemContextType>({
  imageNumber: 0,
  imageUrl: '',
  commentsCount: 0,
  likesCount: 0,

  showCheckbox: false,
  showGripIcon: false,
  showNumberBadge: false,

  isUploading: false,
  isDragging: false,
});

export function EmoticonItemProvider({
  imageNumber,
  imageUrl = '',
  commentsCount = 0,
  likesCount = 0,
  showCheckbox = false,
  showGripIcon = false,
  showNumberBadge = false,
  isUploading = false,
  isDragging = false,
  children,
}: PropsWithChildren<{
  imageNumber: number;
  commentsCount?: number;
  likesCount?: number;
  showCheckbox?: boolean;
  showNumberBadge?: boolean;
  showGripIcon?: boolean;
  imageUrl?: string;
  isUploading?: boolean;
  isDragging?: boolean;
}>) {
  return (
    <emoticonItemContext.Provider
      value={{
        imageNumber,
        imageUrl,
        commentsCount,
        likesCount,

        showCheckbox,
        showGripIcon,
        showNumberBadge,

        isUploading,
        isDragging,
      }}
    >
      {children}
    </emoticonItemContext.Provider>
  );
}

export default function useEmoticonItem() {
  const context = useContext(emoticonItemContext);

  if (!context) {
    throw new Error(
      'useEmoticonItem는 EmoticonItemProvider 내에서만 사용할 수 있습니다.',
    );
  }
  return context;
}
