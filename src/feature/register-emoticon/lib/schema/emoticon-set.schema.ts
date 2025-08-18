import { z } from 'zod';

export const imageUrlSchema = z.object({
  imageUrl: z.string().startsWith('http', '올바른 URL 형식이 아니에요'),
  imageOrder: z
    .number()
    .int()
    .min(0, '이미지 순서는 0 이상이어야 해요')
    .default(0),
  blurUrl: z.string().nullable(),
  webpUrl: z.string().nullable(),
});

export const emoticonSetSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상이어야 해요'),
  author_name: z.string().min(2, '작성자 이름은 2자 이상이어야 해요'),
  platform: z.string().min(1, '플랫폼은 필수에요'),
  type: z.string().min(1, '타입은 필수에요'),
  description: z
    .string()
    .min(10, '설명은 10자 이상이어야 해요')
    .max(100, '설명은 300자 이하여야 해요'),
  is_private: z.boolean(),
  representative_i: imageUrlSchema,
});

export const imageUrlsArraySchema = z.array(imageUrlSchema);

export type EmoticonSetSchema = z.infer<typeof emoticonSetSchema>;
export type ImageUrlSchema = z.infer<typeof imageUrlSchema>;
