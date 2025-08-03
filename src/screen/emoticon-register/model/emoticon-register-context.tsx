'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface EmoticonRegisterContextType {
  isEmoticonSectionVisible: boolean;
  setIsEmoticonSectionVisible: (visible: boolean) => void;
  isEmoticonSectionVisibleMobile: boolean;
  setIsEmoticonSectionVisibleMobile: (visible: boolean) => void;
}

const EmoticonRegisterContext =
  createContext<EmoticonRegisterContextType | null>(null);

export function EmoticonRegisterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isEmoticonSectionVisible, setIsEmoticonSectionVisible] =
    useState(false);
  const [isEmoticonSectionVisibleMobile, setIsEmoticonSectionVisibleMobile] =
    useState(false);

  return (
    <EmoticonRegisterContext.Provider
      value={{
        isEmoticonSectionVisible,
        isEmoticonSectionVisibleMobile,
        setIsEmoticonSectionVisible,
        setIsEmoticonSectionVisibleMobile,
      }}
    >
      {children}
    </EmoticonRegisterContext.Provider>
  );
}

export function useEmoticonRegisterContext() {
  const context = useContext(EmoticonRegisterContext);
  if (!context) {
    throw new Error(
      'useEmoticonRegisterContext must be used within EmoticonRegisterContextProvider',
    );
  }
  return context;
}
