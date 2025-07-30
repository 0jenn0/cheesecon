'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentValue: string;
  setCurrentValue: (currentValue: string) => void;
}

export const SelectContext = createContext<SelectContextType>({
  isOpen: false,
  setIsOpen: () => {},
  currentValue: '',
  setCurrentValue: () => {},
});

export default function SelectProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  return (
    <SelectContext.Provider
      value={{ isOpen, setIsOpen, currentValue, setCurrentValue }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelect는 SelectProvider 내에서만 사용할 수 있습니다.');
  }
  return context;
};
