import { z } from 'zod';

export const emoticonSetSchema = z.object({
  id: z.string().optional(),
  author_name: z.string().min(2, '작성자 이름은 2자 이상이어야 해요'),
  title: z.string().min(1, '제목은 필수에요'),
  platform: z.string().min(1, '플랫폼은 필수에요'),
  type: z.string().min(1, '타입은 필수에요'),
  description: z.string().min(10, '설명은 10자 이상이어야 해요'),
  is_private: z.boolean().nullable(),
  password_hash: z.string().nullable(),
  comments_count: z.number().int().min(0).nullable(),
  likes_count: z.number().int().min(0).nullable(),
  views_count: z.number().int().min(0).nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  representative_image_url: z
    .string()
    .startsWith('http', { message: '올바른 URL 형식이 아니에요' })
    .nullable()
    .refine((val) => val !== null && val.length > 0, {
      message: '대표 이미지는 필수에요',
    }),
  user_id: z.string().nullable(),
});

export const imageUrlSchema = z.object({
  imageUrl: z.string().startsWith('http', '올바른 URL 형식이 아니에요'),
  imageOrder: z.number().int().min(0, '이미지 순서는 0 이상이어야 해요'),
});

export const imageUrlsArraySchema = z.array(imageUrlSchema);

export type EmoticonSetSchema = z.infer<typeof emoticonSetSchema>;
export type ImageUrlSchema = z.infer<typeof imageUrlSchema>;
