import { createStore } from 'zustand/vanilla';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { CreateEmoticonSetForm } from '@/entity/emoticon-set';

export interface ImageMeta extends EmoticonImageState {
  status?: 'idle' | 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

export type DraftMeta = CreateEmoticonSetForm;

type State = {
  order: number[];
  representativeImage: EmoticonImageState;
  byId: Record<string, EmoticonImageState>;
  byOrder: Record<number, EmoticonImageState | undefined>;
  meta: DraftMeta;
};

type Actions = {
  initMeta: (v?: Partial<DraftMeta>) => void;
  addImages: (files: EmoticonImageState[]) => void; //
  removeImage: (id: string) => void;
  reorder: (fromSlot: number, toSlot: number) => void;
  setRepresentativeImage: (id: string) => void;
  updateMeta: (patch: Partial<DraftMeta>) => void;
  setStatus: (id: string, status: ImageMeta['status'], msg?: string) => void;
  getFile: (id: string) => EmoticonImageState | undefined;
  getAllImages: () => EmoticonImageState[];
  getOrder: () => number[];
};

export type DraftStore = State & Actions;

const EMPTY_REPRESENTATIVE_IMAGE: EmoticonImageState = {
  id: '',
  image_url: '',
  blur_url: '',
  webp_url: '',
  image_order: 0,
  is_representative: true,
};

function recomputeOrder(
  byOrder: Record<number, EmoticonImageState | undefined>,
) {
  return Object.keys(byOrder)
    .map(Number)
    .filter((slot) => !!byOrder[slot])
    .sort((a, b) => a - b);
}

export function createDraftStore() {
  const files = new Map<string, EmoticonImageState>();

  return createStore<DraftStore>()((set, get) => ({
    order: [],
    representativeImage: EMPTY_REPRESENTATIVE_IMAGE,
    byId: {},
    byOrder: {},
    meta: {} as DraftMeta,

    initMeta: (v) =>
      set((store) => ({
        meta: { ...store.meta, ...(v as Partial<DraftMeta>) },
      })),

    addImages: (arr) => {
      set((store) => {
        const byId = { ...store.byId };
        const byOrder: Record<number, EmoticonImageState | undefined> = {
          ...store.byOrder,
        };

        for (const image of arr) {
          const slot = image.image_order;
          const statePart: EmoticonImageState = {
            id: image.id,
            image_url: image.image_url,
            blur_url: image.blur_url ?? '',
            webp_url: image.webp_url ?? '',
            image_order: slot,
            is_representative: image.is_representative ?? false,
          };

          files.set(image.id, statePart);
          byId[statePart.id] = statePart;
          byOrder[slot] = statePart;
        }

        return {
          byId,
          byOrder,
          order: recomputeOrder(byOrder),
          representativeImage: EMPTY_REPRESENTATIVE_IMAGE,
        };
      });
    },

    removeImage: (id) => {
      set((store) => {
        const target = store.byId[id];
        if (!target) return store;

        const byId = { ...store.byId };
        const byOrder = { ...store.byOrder };
        const slot = target.image_order;

        delete byId[id];
        byOrder[slot] = undefined;
        files.delete(id);

        return {
          byId,
          byOrder,
          order: recomputeOrder(byOrder),
        };
      });
    },

    reorder: (fromSlot, toSlot) => {
      set((store) => {
        const byOrder = { ...store.byOrder };
        const byId = { ...store.byId };

        const src = byOrder[fromSlot];
        const dst = byOrder[toSlot];

        if (!src) return store;

        byOrder[toSlot] = src ? { ...src, image_order: toSlot } : undefined;
        if (byOrder[toSlot]) {
          byId[byOrder[toSlot]!.id] = byOrder[toSlot]!;
        }

        byOrder[fromSlot] = dst ? { ...dst, image_order: fromSlot } : undefined;
        if (byOrder[fromSlot]) {
          byId[byOrder[fromSlot]!.id] = byOrder[fromSlot]!;
        }

        return {
          byOrder,
          byId,
          order: recomputeOrder(byOrder),
        };
      });
    },

    setRepresentativeImage: (id) => {
      set((store) => {
        if (!store.byId[id]) return store;

        const byId: Record<string, EmoticonImageState> = {};
        for (const [k, v] of Object.entries(store.byId)) {
          byId[k] = { ...v, is_representative: k === id };
        }

        return {
          byId,
          representativeImage: byId[id],
        };
      });
    },

    updateMeta: (patch) =>
      set((store) => ({
        meta: { ...store.meta, ...(patch as Partial<DraftMeta>) },
      })),

    setStatus: (id, status, msg) => {
      set((store) => {
        if (!store.byId[id]) return store;
        const next = {
          ...(store.byId[id] as any),
          status,
          errorMessage: msg,
        };
        return {
          byId: { ...store.byId, [id]: next },
        } as any;
      });
    },

    getFile: (id) => files.get(id),
    getAllImages: () => Object.values(get().byId),
    getOrder: () => get().order,
  }));
}
