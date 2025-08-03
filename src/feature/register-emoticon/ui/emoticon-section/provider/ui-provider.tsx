import { createContext, useContext, useState } from 'react';

interface UIContextType {
  isMultipleSelect: boolean;
  toggleMultipleSelect: () => void;

  isOrderChange: boolean;
  toggleOrderChange: () => void;
  handleOrderChange: (value: boolean) => void;
}

const UIContext = createContext<UIContextType>({
  isMultipleSelect: false,
  toggleMultipleSelect: () => {
    throw new Error('toggleMultipleSelect 함수를 정의해주세요.');
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

  const toggleMultipleSelect = () => {
    setIsMultipleSelect((prev) => !prev);
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
        toggleMultipleSelect,
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
