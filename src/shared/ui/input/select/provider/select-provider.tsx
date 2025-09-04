'use client';

import { PropsWithChildren, createContext, useContext, useState, useRef, useEffect } from 'react';

export interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentValue: string;
  setCurrentValue: (currentValue: string) => void;
  selectRef: React.RefObject<HTMLDivElement>;
}

export const SelectContext = createContext<SelectContextType>({
  isOpen: false,
  setIsOpen: () => {},
  currentValue: '',
  setCurrentValue: () => {},
  selectRef: { current: null },
});

export default function SelectProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SelectContext.Provider
      value={{ isOpen, setIsOpen, currentValue, setCurrentValue, selectRef }}
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
