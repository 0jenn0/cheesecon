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
  handleEmoticonItem: (
    imageNumber: number,
    action: EmoticonItemAction,
    {
      newImageNumber,
      imageNumbers,
      imageUrl,
    }: { newImageNumber?: number; imageNumbers?: number[]; imageUrl?: string },
  ) => void;
}

const EmoticonContext = createContext<EmoticonContextType>({
  items: [],
  handleEmoticonItem: () => {
    throw new Error('handleEmoticonItem 함수를 정의해주세요.');
  },
});

export function EmoticonProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EmoticonItem[]>(INITIAL_ITEMS);

  type typeOfImageNumber = (typeof items)[number]['imageNumber'];

  const handleCheckEmoticonItem = useCallback(
    (imageNumbers: typeOfImageNumber[]) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          imageNumbers.includes(item.imageNumber)
            ? { ...item, isChecked: true }
            : item,
        ),
      );
    },
    [],
  );

  const handleUncheckEmoticonItem = useCallback(
    (imageNumbers: typeOfImageNumber[]) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          imageNumbers.includes(item.imageNumber)
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
      imageNumber: typeOfImageNumber[] | typeOfImageNumber,
      action: EmoticonItemAction,
      {
        newImageNumber,
        imageUrl,
      }: {
        newImageNumber?: typeOfImageNumber;
        imageUrl?: string;
      },
    ) => {
      switch (action) {
        case 'CHECK':
          handleCheckEmoticonItem(
            Array.isArray(imageNumber) ? imageNumber : [imageNumber],
          );
          break;
        case 'UNCHECK':
          handleUncheckEmoticonItem(
            Array.isArray(imageNumber) ? imageNumber : [imageNumber],
          );
          break;
        case 'CHANGE_ORDER':
          if (newImageNumber) {
            if (Array.isArray(imageNumber)) {
              throw new Error(
                'imageNumber는 하나의 이모티콘만 변경할 수 있습니다.',
              );
            } else {
              handleChangeOrderEmoticonItem(imageNumber, newImageNumber);
            }
          } else {
            throw new Error('newImageNumber가 필요합니다.');
          }
          break;
        case 'UPLOAD':
          if (Array.isArray(imageNumber)) {
            throw new Error(
              'imageNumber는 하나의 이모티콘만 변경할 수 있습니다.',
            );
          } else {
            if (imageUrl) {
              handleUploadEmoticonItem(imageNumber, imageUrl);
            } else {
              throw new Error('imageUrl이 필요합니다.');
            }
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
    <EmoticonContext.Provider value={{ items, handleEmoticonItem }}>
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
