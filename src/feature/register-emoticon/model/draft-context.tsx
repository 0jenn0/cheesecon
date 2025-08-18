'use client';

import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import type { StoreApi } from 'zustand/vanilla';
import {
  type DraftMeta,
  type DraftStore,
  createDraftStore,
} from './draft-store';

const DraftStoreCtx = createContext<StoreApi<DraftStore> | null>(null);

export function DraftProvider({
  children,
  initialMeta,
}: PropsWithChildren<{ initialMeta?: Partial<DraftMeta> }>) {
  const storeRef = useRef<StoreApi<DraftStore>>(createDraftStore());
  if (!storeRef.current) {
    storeRef.current = createDraftStore();
    if (initialMeta) storeRef.current.getState().initMeta(initialMeta);
  }
  return (
    <DraftStoreCtx.Provider value={storeRef.current}>
      {children}
    </DraftStoreCtx.Provider>
  );
}

export function useDraft<T>(selector: (s: DraftStore) => T) {
  const store = useContext(DraftStoreCtx);
  if (!store) throw new Error('DraftProvider 안에서만 사용하세요');
  return useStore(store, selector);
}
