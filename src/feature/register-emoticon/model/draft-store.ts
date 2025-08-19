/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'zustand/vanilla';
import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { CreateEmoticonSetForm } from '@/entity/emoticon-set';
import {
  EMOTICON_CONFIG,
  EmoticonPlatform,
  EmoticonType,
} from '../config/emoticon-config';
import {
  validateEmoticonSet,
  validateEmoticonSetField,
  validateImageUrlItem,
  validateImageUrls,
} from '../lib/validation';

export interface ImageMeta extends EmoticonImageState {
  status?: 'idle' | 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

export type DraftMeta = CreateEmoticonSetForm;

type State = {
  order: number[];
  selectedImageIds: string[];
  representativeImage: EmoticonImageState | null;
  uploadedCount: number;
  byId: Record<string, ImageMeta>;
  byOrder: Record<number, ImageMeta | undefined>;
  byIdOriginal: Record<string, ImageMeta>;
  byOrderOriginal: Record<number, ImageMeta | undefined>;

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

  addRepresentativeImage: (file: EmoticonImageState) => {
    success: boolean;
    accepted: string[];
    rejected: Array<{ id: string; errors: string[] }>;
  };

  removeImage: (id: string) => void;
  reorder: (fromSlot: number, toSlot: number) => void;
  updateMeta: (patch: Partial<DraftMeta>) => void;
  setStatus: (order: number, status: ImageMeta['status'], msg?: string) => void;
  getStatus: (order: number) => ImageMeta['status'];
  getFile: (id: string) => ImageMeta | undefined;
  getAllImages: () => ImageMeta[];
  getOrder: () => number[];

  cancelReordering: () => void;
  saveReordering: () => void;

  validateAll: () => { success: boolean; error?: any };

  toggleSelectedImage: (id: string) => void;
};

export type DraftStore = State & Actions;

const EMPTY_REPRESENTATIVE_IMAGE: EmoticonImageState | null = null;

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
    originalOrder: [],
    selectedImageIds: [],
    uploadedCount: 0,
    representativeImage: EMPTY_REPRESENTATIVE_IMAGE,
    byId: {},
    byOrder: {},
    byIdOriginal: {},
    byOrderOriginal: {},
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
        const byIdOriginal = { ...store.byIdOriginal };
        const byOrderOriginal = {
          ...store.byOrderOriginal,
        };
        const imageErrors = { ...store.imageErrors };
        let uploadedCount = store.uploadedCount;

        for (const image of arr) {
          const item: EmoticonImageState = {
            id: image.id,
            image_url: image.image_url,
            blur_url: image.blur_url ?? '',
            webp_url: image.webp_url ?? '',
            image_order: image.image_order,
            is_representative: false,
          };

          const errs = validateImageUrlsOf(item);

          if (errs.length > 0) {
            rejected.push({ id: item.id, errors: errs });
            imageErrors[item.id] = errs;
            continue;
          }

          if (byIdOriginal[item.id]) {
            const existingImage = byIdOriginal[item.id];
            if (existingImage) {
              byOrderOriginal[existingImage.image_order] = undefined;
            }
          }

          if (byOrderOriginal[item.image_order]) {
            const existingImage = byOrderOriginal[item.image_order];
            if (existingImage) {
              delete byIdOriginal[existingImage.id];
            }
          }

          uploadedCount++;

          files.set(item.id, item);
          byIdOriginal[item.id] = { ...item };
          byOrderOriginal[item.image_order] = { ...item };
          if (imageErrors[item.id]) delete imageErrors[item.id];
          accepted.push(item.id);
        }

        return {
          byIdOriginal,
          byOrderOriginal,
          uploadedCount,
          order: recomputeOrder(byOrderOriginal),
          imageErrors,
        };
      });

      return { success: rejected.length === 0, accepted, rejected };
    },

    addRepresentativeImage: (item) => {
      const accepted: string[] = [];
      const rejected: Array<{ id: string; errors: string[] }> = [];

      set((store) => {
        const byId = { ...store.byId, [item.id]: item };
        const byOrder = { ...store.byOrder, [item.image_order]: item };
        const imageErrors = { ...store.imageErrors };
        const representativeImage = { ...store.representativeImage, ...item };

        const errs = validateImageUrlsOf(item);

        if (errs.length > 0) {
          rejected.push({ id: item.id, errors: errs });
          imageErrors[item.id] = errs;
        }

        accepted.push(item.id);

        return {
          byId,
          byOrder,
          representativeImage,
          imageErrors,
        };
      });

      return { success: rejected.length === 0, accepted: [item.id], rejected };
    },

    removeImage: (id) => {
      const uploadCount = get().uploadedCount - 1;
      set((store) => {
        const target = store.byIdOriginal[id];
        if (!target) return store;

        const byIdOriginal = { ...store.byIdOriginal };
        const byOrderOriginal = { ...store.byOrderOriginal };
        const imageErrors = { ...store.imageErrors };

        delete byIdOriginal[id];

        byOrderOriginal[target.image_order] = undefined;

        if (imageErrors[id]) delete imageErrors[id];

        files.delete(id);

        return {
          byIdOriginal,
          byOrderOriginal,
          uploadedCount: uploadCount,
          order: recomputeOrder(byOrderOriginal),
          imageErrors,
        };
      });
    },

    reorder: (fromSlot, toSlot) => {
      set((store) => {
        const byOrderOriginal = { ...store.byOrderOriginal };
        const byIdOriginal = { ...store.byIdOriginal };

        const src = byOrderOriginal[fromSlot];
        const dst = byOrderOriginal[toSlot];
        if (!src) return store;

        byOrderOriginal[fromSlot] = undefined;

        byOrderOriginal[toSlot] = { ...src, image_order: toSlot };
        byIdOriginal[src.id] = byOrderOriginal[toSlot]!;

        if (dst) {
          byOrderOriginal[fromSlot] = { ...dst, image_order: fromSlot };
          byIdOriginal[dst.id] = byOrderOriginal[fromSlot]!;
        }

        return {
          byOrderOriginal,
          byIdOriginal,
          order: recomputeOrder(byOrderOriginal),
        };
      });
    },

    updateMeta: (patch) =>
      set((store) => ({
        meta: { ...store.meta, ...(patch as Partial<DraftMeta>) },
      })),

    setStatus: (order, status, msg) => {
      set((store) => {
        const byOrderOriginal = { ...store.byOrderOriginal };
        const byIdOriginal = { ...store.byIdOriginal };

        if (!byOrderOriginal[order]) {
          const tempId = crypto.randomUUID();
          const tempImage: ImageMeta = {
            id: tempId,
            image_url: '',
            image_order: order,
            blur_url: '',
            webp_url: '',
            is_representative: false,
            status,
            errorMessage: msg,
          };
          byOrderOriginal[order] = tempImage;
          byIdOriginal[tempId] = tempImage;
        } else {
          const existingImage = byOrderOriginal[order]!;
          byOrderOriginal[order] = {
            ...existingImage,
            status,
            errorMessage: msg,
          };
          byIdOriginal[existingImage.id] = byOrderOriginal[order]!;
        }

        return {
          byOrderOriginal,
          byIdOriginal,
        };
      });
    },

    getStatus: (order) => {
      return get().byOrderOriginal[order]?.status ?? 'idle';
    },

    getFile: (id) => files.get(id),
    getAllImages: () => Object.values(get().byIdOriginal),
    getOrder: () => get().order,

    validateAll: () => {
      const store = get();
      const info = { ...store.meta };

      const infoResult = validateEmoticonSet(info);

      const imageArray = Object.values(store.byOrderOriginal).filter(Boolean);

      const imageResult = validateImageUrls(imageArray);

      if (!infoResult.success) {
        return { success: false, error: infoResult.error };
      }

      if (!imageResult.success) {
        return { success: false, error: imageResult.error };
      }

      if (
        imageArray.length !==
        EMOTICON_CONFIG[store.meta.platform as EmoticonPlatform][
          store.meta.type as EmoticonType
        ].count
      ) {
        return { success: false, error: '이모티콘 개수가 일치하지 않습니다.' };
      }

      return { success: true };
    },

    saveReordering: () => {
      set((store) => ({
        byId: store.byIdOriginal,
        byOrder: store.byOrderOriginal,
      }));
    },

    cancelReordering: () => {
      set((store) => ({
        byIdOriginal: store.byId,
        byOrderOriginal: store.byOrder,
      }));
    },

    toggleSelectedImage: (id: string) => {
      set((store) => ({
        selectedImageIds: store.selectedImageIds.includes(id)
          ? store.selectedImageIds.filter((imageId) => imageId !== id)
          : [...store.selectedImageIds, id],
      }));
    },
  }));
}
