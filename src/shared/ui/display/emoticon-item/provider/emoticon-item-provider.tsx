import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface EmoticonItemContextType {
  imageNumber: number;

  showCheckbox: boolean;
  isChecked: boolean;
  handleCheck: () => void;

  showGripIcon: boolean;

  imageUrl: string;
  isUploading: boolean;

  isDragging: boolean;
}

export const emoticonItemContext = createContext<EmoticonItemContextType>({
  imageNumber: 0,

  showCheckbox: false,
  isChecked: false,
  handleCheck: () => {},

  showGripIcon: false,

  imageUrl: '',
  isUploading: false,

  isDragging: false,
});

export function EmoticonItemProvider({
  imageNumber,
  showCheckbox = false,
  showGripIcon = false,
  imageUrl = '',
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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <emoticonItemContext.Provider
      value={{
        imageNumber,
        showCheckbox,
        isChecked,
        handleCheck,
        showGripIcon,

        imageUrl,
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
