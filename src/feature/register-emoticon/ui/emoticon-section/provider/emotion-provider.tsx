import { createContext, useCallback, useContext, useState } from 'react';

export interface EmoticonItem {
  imageNumber: number;
  imageUrl?: string;
  isChecked?: boolean;
}

export type EmoticonItemAction =
  | 'CHECK'
  | 'UNCHECK'
  | 'CHANGE_ORDER'
  | 'UPLOAD';

const INITIAL_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  imageNumber: i + 1,
  imageUrl: '',
}));

export interface EmoticonContextType {
  items: EmoticonItem[];
  changeStack: {
    imageNumber: number;
    newImageNumber: number;
  }[];
  setChangeStack: (imageNumber: number, newImageNumber: number) => void;
  clearChangeStack: () => void;
  handleEmoticonItem: (
    imageNumber: number,
    action: EmoticonItemAction,
    params?: {
      newImageNumber?: number;
      imageNumbers?: number[];
      imageUrl?: string;
    },
  ) => void;
}

const EmoticonContext = createContext<EmoticonContextType | null>(null);

export function EmoticonProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EmoticonItem[]>(INITIAL_ITEMS);
  const [changeStack, setChangeStackState] = useState<
    {
      imageNumber: number;
      newImageNumber: number;
    }[]
  >([]);

  const setChangeStack = (imageNumber: number, newImageNumber: number) => {
    setChangeStackState((prev) => [...prev, { imageNumber, newImageNumber }]);
  };

  const clearChangeStack = () => {
    setChangeStackState([]);
  };

  type typeOfImageNumber = (typeof items)[number]['imageNumber'];

  const handleCheckEmoticonItem = useCallback(
    (imageNumber: typeOfImageNumber) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.imageNumber === imageNumber
            ? { ...item, isChecked: true }
            : item,
        ),
      );
    },
    [],
  );

  const handleUncheckEmoticonItem = useCallback(
    (imageNumber: typeOfImageNumber) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.imageNumber === imageNumber
            ? { ...item, isChecked: false }
            : item,
        ),
      );
    },
    [],
  );

  const handleChangeOrderEmoticonItem = useCallback(
    (imageNumber: typeOfImageNumber, newImageNumber: typeOfImageNumber) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.imageNumber === imageNumber
            ? { ...item, imageNumber: newImageNumber }
            : item.imageNumber === newImageNumber
              ? { ...item, imageNumber: imageNumber }
              : item,
        ),
      );
    },
    [],
  );

  const handleUploadEmoticonItem = useCallback(
    (imageNumber: typeOfImageNumber, imageUrl: string) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.imageNumber === imageNumber ? { ...item, imageUrl } : item,
        ),
      );
    },
    [],
  );

  const handleEmoticonItem = useCallback(
    (
      imageNumber: typeOfImageNumber,
      action: EmoticonItemAction,
      params?: {
        newImageNumber?: typeOfImageNumber;
        imageNumbers?: typeOfImageNumber[];
        imageUrl?: string;
      },
    ) => {
      const { newImageNumber, imageUrl } = params || {};
      switch (action) {
        case 'CHECK':
          handleCheckEmoticonItem(imageNumber);
          break;
        case 'UNCHECK':
          handleUncheckEmoticonItem(imageNumber);
          break;
        case 'CHANGE_ORDER':
          if (newImageNumber) {
            handleChangeOrderEmoticonItem(imageNumber, newImageNumber);
          } else {
            throw new Error('newImageNumber가 필요합니다.');
          }
          break;
        case 'UPLOAD':
          if (imageUrl || imageUrl === '') {
            handleUploadEmoticonItem(imageNumber, imageUrl);
          } else {
            throw new Error('imageUrl이 필요합니다.');
          }
          break;
        default:
          throw new Error('잘못된 액션입니다.');
      }
    },
    [
      handleCheckEmoticonItem,
      handleUncheckEmoticonItem,
      handleChangeOrderEmoticonItem,
      handleUploadEmoticonItem,
    ],
  );

  return (
    <EmoticonContext.Provider
      value={{
        items,
        changeStack,
        setChangeStack,
        clearChangeStack,
        handleEmoticonItem,
      }}
    >
      {children}
    </EmoticonContext.Provider>
  );
}

export default function useEmoticonContext() {
  const context = useContext(EmoticonContext);
  if (!context) {
    throw new Error(
      'useEmoticonContext는 EmoticonProvider 내에서 사용되어야 합니다.',
    );
  }
  return context;
}
