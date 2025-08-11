'use server';

import sharp from 'sharp';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ImageUploadResult, ImageUrlResult } from '../type';
import { sanitizeFileName } from '../util';

export async function uploadImageToBucket(
  formData: FormData,
): Promise<ImageUploadResult> {
  const supabase = await createServerSupabaseClient();
  const file = formData.get('file') as File;

  const webpBuffer = await convertToWebPwidthSharp(file);

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

  const { data: webpData, error: webpError } = await supabase.storage
    .from(bucketName)
    .upload(safeFileName, webpBuffer, {
      upsert: true,
      contentType: 'image/webp',
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`업로드 중 오류가 발생했습니다: ${error.message}`);
  }

  if (webpError) {
    console.error('WebP 업로드 중 오류가 발생했습니다:', webpError);
    throw new Error(`WebP 업로드 중 오류가 발생했습니다: ${webpError.message}`);
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`;

  const blurUrl = await generateBlurDataUrl(imageUrl);

  const webpUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${webpData.path}`;

  return {
    path: data.path,
    url: imageUrl,
    blurUrl,
    webpUrl,
  };
}

export async function getImageUrl(path: string): Promise<ImageUrlResult> {
  const supabase = await createServerSupabaseClient();

  const { data } = supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '')
    .getPublicUrl(path);

  return data;
}

export async function generateBlurDataUrl(
  imageUrl: string,
): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const processedBuffer = await sharp(buffer)
      .resize(10, 10, { fit: 'inside' })
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .blur(1)
      .toBuffer();

    const base64 = `data:image/png;base64,${processedBuffer.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error('블러 생성 실패:', error);
    return null;
  }
}

async function convertToWebPwidthSharp(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
}
