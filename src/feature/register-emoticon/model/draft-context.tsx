'use client';

import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import type { StoreApi } from 'zustand/vanilla';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import {
  type DraftMeta,
  type DraftStore,
  createDraftStore,
} from './draft-store';

const DraftStoreCtx = createContext<StoreApi<DraftStore> | null>(null);

export function DraftProvider({
  children,
  initialMeta,
  initialImages,
}: PropsWithChildren<{
  initialMeta?: Partial<DraftMeta>;
  initialImages?: EmoticonImageState[];
}>) {
  const storeRef = useRef<StoreApi<DraftStore>>(createDraftStore());

  if (!storeRef.current) {
    storeRef.current = createDraftStore();
  }
  if (initialMeta) {
    storeRef.current.getState().initMeta(initialMeta);
  }
  if (initialImages) {
    storeRef.current.getState().initImages(initialImages);
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
