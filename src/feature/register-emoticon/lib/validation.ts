import {
  emoticonSetSchema,
  imageUrlsArraySchema,
} from './schema/emoticon-set.schema';

export const validateEmoticonSet = (data: unknown) => {
  return emoticonSetSchema.safeParse(data);
};

export const validateImageUrls = (data: unknown) => {
  return imageUrlsArraySchema.safeParse(data);
};
