import { EmoticonImageState } from '@/entity/emoticon-images/type/emoticon-image.type';
import { DraftMeta, ImageMeta } from '../model/draft-store';
import {
  emoticonSetSchema,
  imageUrlSchema,
  imageUrlsArraySchema,
} from './schema/emoticon-set.schema';

export const validateEmoticonSet = (data: DraftMeta) => {
  return emoticonSetSchema.safeParse(data);
};

export const validateImageUrls = (data: ImageMeta[]) => {
  return imageUrlsArraySchema.safeParse(data);
};

export const validateEmoticonSetField = (field: string, value: unknown) => {
  const fieldSchema = (
    emoticonSetSchema.shape as Record<
      string,
      {
        safeParse: (value: unknown) => {
          success: boolean;
          data?: unknown;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error?: any;
        };
      }
    >
  )[field];
  if (!fieldSchema) {
    return { success: true as const, data: value };
  }
  return fieldSchema.safeParse(value);
};

export const validateImageUrlItem = (data: unknown) => {
  return imageUrlSchema.safeParse(data);
};
