import { createStore } from 'zustand/vanilla';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { CreateEmoticonSetForm } from '@/entity/emoticon-set';
import {
  validateEmoticonSet,
  validateEmoticonSetField,
  validateImageUrlItem,
} from '../lib/validation';

export interface ImageMeta extends EmoticonImageState {
  status?: 'idle' | 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

export type DraftMeta = CreateEmoticonSetForm;

type State = {
  order: number[];
  byId: Record<string, EmoticonImageState>;
  byOrder: Record<number, EmoticonImageState | undefined>;
  meta: DraftMeta;

  metaErrors: Partial<Record<keyof DraftMeta & string, string>>;
  imageErrors: Record<string, string[]>;
};

type Actions = {
  initMeta: (v?: Partial<DraftMeta>) => void;

  setMetaField: <K extends keyof DraftMeta & string>(
    field: K,
    value: DraftMeta[K] | unknown,
  ) => { success: boolean; error?: string };

  updateMetaValidated: (patch: Partial<DraftMeta>) => {
    success: boolean;
    errors: Partial<Record<string, string>>;
  };

  addImages: (files: EmoticonImageState[]) => {
    success: boolean;
    accepted: string[];
    rejected: Array<{ id: string; errors: string[] }>;
  };

  removeImage: (id: string) => void;
  reorder: (fromSlot: number, toSlot: number) => void;
  setRepresentativeImage: (id: string) => void;
  updateMeta: (patch: Partial<DraftMeta>) => void;
  setStatus: (id: string, status: ImageMeta['status'], msg?: string) => void;
  getFile: (id: string) => EmoticonImageState | undefined;
  getAllImages: () => EmoticonImageState[];
  getOrder: () => number[];

  validateAll: () => { success: boolean; error?: any };
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

function validateImageUrlsOf(item: EmoticonImageState): string[] {
  const errs: string[] = [];

  const r = validateImageUrlItem(item);
  if (!r.success) errs.push(r.error?.issues?.[0]?.message ?? 'invalid');

  return errs;
}

export function createDraftStore() {
  const files = new Map<string, EmoticonImageState>();

  return createStore<DraftStore>()((set, get) => ({
    order: [],
    representativeImage: EMPTY_REPRESENTATIVE_IMAGE,
    byId: {},
    byOrder: {},
    meta: {} as DraftMeta,

    metaErrors: {},
    imageErrors: {},

    initMeta: (v) =>
      set((store) => ({
        meta: { ...store.meta, ...(v as Partial<DraftMeta>) },
      })),

    setMetaField: (field, value) => {
      const result = validateEmoticonSetField(field, value);

      if (!result.success) {
        const err = (result as any).error;
        const msg = err?.issues?.[0]?.message ?? 'invalid';

        set((store) => ({
          metaErrors: { ...store.metaErrors, [field]: msg },
        }));
        return { success: false, error: msg };
      }

      set((s) => ({
        meta: { ...s.meta, [field]: (result as any).data },
        metaErrors: { ...s.metaErrors, [field]: undefined as any },
      }));
      return { success: true };
    },

    updateMetaValidated: (patch) => {
      const errors: Partial<Record<string, string>> = {};
      const next: any = {};

      for (const [k, v] of Object.entries(patch)) {
        const r = validateEmoticonSetField(k, v);
        if (r.success) next[k] = (r as any).data;
        else errors[k] = 'invalid value';
      }

      set((s) => ({
        meta: { ...s.meta, ...next },
        metaErrors: { ...s.metaErrors, ...errors },
      }));

      return { success: Object.keys(errors).length === 0, errors };
    },

    addImages: (arr) => {
      const accepted: string[] = [];
      const rejected: Array<{ id: string; errors: string[] }> = [];

      set((store) => {
        const byId = { ...store.byId };
        const byOrder: Record<number, EmoticonImageState | undefined> = {
          ...store.byOrder,
        };
        const imageErrors = { ...store.imageErrors };

        for (const image of arr) {
          const item: EmoticonImageState = {
            id: image.id,
            image_url: image.image_url,
            blur_url: image.blur_url ?? '',
            webp_url: image.webp_url ?? '',
            image_order: image.image_order,
            is_representative: image.is_representative ?? false,
          };

          const errs = validateImageUrlsOf(item);

          if (errs.length > 0) {
            rejected.push({ id: item.id, errors: errs });
            imageErrors[item.id] = errs;
            continue;
          }

          if (byId[item.id]) {
            const existingImage = byId[item.id];
            if (existingImage) {
              byOrder[existingImage.image_order] = undefined;
            }
          }

          if (byOrder[item.image_order]) {
            const existingImage = byOrder[item.image_order];
            if (existingImage) {
              delete byId[existingImage.id];
            }
          }

          files.set(item.id, item);
          byId[item.id] = item;
          byOrder[item.image_order] = item;
          if (imageErrors[item.id]) delete imageErrors[item.id];
          accepted.push(item.id);
        }

        return {
          byId,
          byOrder,
          order: recomputeOrder(byOrder),
          representativeImage: EMPTY_REPRESENTATIVE_IMAGE,
          imageErrors,
        };
      });

      return { success: rejected.length === 0, accepted, rejected };
    },

    removeImage: (id) => {
      set((store) => {
        const target = store.byId[id];
        if (!target) return store;

        const byId = { ...store.byId };
        const byOrder = { ...store.byOrder };
        const imageErrors = { ...store.imageErrors };

        // byId에서 제거
        delete byId[id];

        // byOrder에서 제거
        byOrder[target.image_order] = undefined;

        // 에러 정보 제거
        if (imageErrors[id]) delete imageErrors[id];

        // files에서 제거
        files.delete(id);

        return {
          byId,
          byOrder,
          order: recomputeOrder(byOrder),
          imageErrors,
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

        // 기존 위치에서 제거
        byOrder[fromSlot] = undefined;

        // 새 위치에 배치
        byOrder[toSlot] = { ...src, image_order: toSlot };
        byId[src.id] = byOrder[toSlot]!;

        // 기존에 있던 이미지가 있다면 다른 위치로 이동
        if (dst) {
          // dst를 fromSlot으로 이동
          byOrder[fromSlot] = { ...dst, image_order: fromSlot };
          byId[dst.id] = byOrder[fromSlot]!;
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

    validateAll: () => {
      const s = get();
      const payload = {
        ...s.meta,
        image_urls: recomputeOrder(s.byOrder).map(
          (slot) => s.byOrder[slot]!.image_url,
        ),
      };

      const r = validateEmoticonSet(payload);
      if (!r.success) return { success: false, error: r.error };
      return { success: true };
    },
  }));
}
