import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface EmoticonItemContextType {
  imageNumber: number;

  showCheckbox: boolean;
  isChecked: boolean;
  handleCheck: () => void;

  showGripIcon: boolean;

  imageUrl: string;
  isImageLoaded: boolean;
  isImageError: boolean;
  setImageUrl: (url: string) => void;
  setIsImageLoaded: (loaded: boolean) => void;
  setIsImageError: (error: boolean) => void;
}

export const emoticonItemContext = createContext<EmoticonItemContextType>({
  imageNumber: 0,

  showCheckbox: false,
  isChecked: false,
  handleCheck: () => {},

  showGripIcon: false,

  imageUrl: '',
  isImageLoaded: false,
  isImageError: false,
  setImageUrl: () => {},
  setIsImageLoaded: () => {},
  setIsImageError: () => {},
});

export function EmoticonItemProvider({
  imageNumber,
  showCheckbox = false,
  showGripIcon = false,
  children,
}: PropsWithChildren<{
  imageNumber: number;
  showCheckbox?: boolean;
  showGripIcon?: boolean;
}>) {
  const [isChecked, setIsChecked] = useState(false);

  //   const [showCheckboxState, setShowCheckboxState] = useState(showCheckbox);

  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

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

        imageUrl: '',
        isImageLoaded: false,
        isImageError: false,
        setImageUrl,
        setIsImageLoaded,
        setIsImageError,
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
