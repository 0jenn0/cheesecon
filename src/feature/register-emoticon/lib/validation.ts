import {
  emoticonSetSchema,
  imageUrlSchema,
  imageUrlsArraySchema,
} from './schema/emoticon-set.schema';

export const validateEmoticonSet = (data: unknown) => {
  return emoticonSetSchema.safeParse(data);
};

export const validateImageUrls = (data: unknown) => {
  return imageUrlsArraySchema.safeParse(data);
};

export const validateEmoticonSetField = (field: string, value: unknown) => {
  const fieldSchema = (emoticonSetSchema.shape as any)[field];
  if (!fieldSchema) {
    return { success: true as const, data: value };
  }
  return fieldSchema.safeParse(value);
};

export const validateImageUrlItem = (data: unknown) => {
  return imageUrlSchema.safeParse(data);
};
