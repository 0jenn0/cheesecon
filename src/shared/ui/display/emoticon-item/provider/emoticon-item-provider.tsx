import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface EmoticonItemContextType {
  imageNumber: number;
  imageUrl: string;

  showCheckbox: boolean;
  showGripIcon: boolean;

  isUploading: boolean;
  isDragging: boolean;
}

export const emoticonItemContext = createContext<EmoticonItemContextType>({
  imageNumber: 0,
  imageUrl: '',

  showCheckbox: false,
  showGripIcon: false,

  isUploading: false,
  isDragging: false,
});

export function EmoticonItemProvider({
  imageNumber,
  imageUrl = '',
  showCheckbox = false,
  showGripIcon = false,
  isUploading = false,
  isDragging = false,
  children,
}: PropsWithChildren<{
  imageNumber: number;
  showCheckbox?: boolean;
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

        showCheckbox,
        showGripIcon,

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
