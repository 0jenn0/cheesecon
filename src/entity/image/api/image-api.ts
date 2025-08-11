'use server';

import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ImageUploadResult, ImageUrlResult } from '../type';
import { sanitizeFileName } from '../util';

export async function uploadImageToBucket(
  formData: FormData,
): Promise<ImageUploadResult> {
  const supabase = await createServerSupabaseClient();
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('파일이 없습니다.');
  }

  const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
  if (!bucketName) {
    throw new Error('스토리지 버킷이 설정되지 않았습니다.');
  }

  const safeFileName = sanitizeFileName(file.name);

  const safeFile = new File([file], safeFileName, { type: file.type });

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(safeFileName, safeFile, { upsert: true });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`업로드 중 오류가 발생했습니다: ${error.message}`);
  }

  return {
    path: data.path,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`,
  };
}

export async function getImageUrl(path: string): Promise<ImageUrlResult> {
  const supabase = await createServerSupabaseClient();

  const { data } = supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '')
    .getPublicUrl(path);

  return data;
}
