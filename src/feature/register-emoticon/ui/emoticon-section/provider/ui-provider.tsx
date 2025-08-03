import { createContext, useContext, useState } from 'react';

interface UIContextType {
  isMultipleSelect: boolean;
  handleMultipleSelect: () => void;

  isOrderChange: boolean;
  toggleOrderChange: () => void;
  handleOrderChange: (value: boolean) => void;
}

const UIContext = createContext<UIContextType>({
  isMultipleSelect: false,
  handleMultipleSelect: () => {
    throw new Error('handleMultipleSelect 함수를 정의해주세요.');
  },

  isOrderChange: false,
  toggleOrderChange: () => {
    throw new Error('toggleOrderChange 함수를 정의해주세요.');
  },
  handleOrderChange: () => {
    throw new Error('handleOrderChange 함수를 정의해주세요.');
  },
});

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [isOrderChange, setIsOrderChange] = useState(false);

  const handleMultipleSelect = () => {
    setIsMultipleSelect(true);
  };

  const toggleOrderChange = () => {
    setIsOrderChange((prev) => !prev);
  };

  const handleOrderChange = (value: boolean) => {
    setIsOrderChange(value);
  };

  return (
    <UIContext.Provider
      value={{
        isMultipleSelect,
        handleMultipleSelect,
        isOrderChange,
        toggleOrderChange,
        handleOrderChange,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export default function useUIContext() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext는 UIProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
