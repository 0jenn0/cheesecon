'use server';

import sharp from 'sharp';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ApiResult } from '@/shared/types';
import { ImageUploadResult, ImageUrlResult } from '../type';
import { sanitizeFileName } from '../util';

export async function uploadImageToBucket(
  formData: FormData,
): Promise<ApiResult<ImageUploadResult>> {
  const supabase = await createServerSupabaseClient();
  const file = formData.get('file') as File;

  const webpBuffer = await convertToWebPwidthSharp(file);

  if (!file) {
    return {
      success: false,
      error: {
        code: 'FILE_NOT_FOUND',
        message: '파일이 없어요.',
      },
    };
  }

  const MAX_FILE_SIZE = 2;
  const isTooLarge = file.size > MAX_FILE_SIZE * 1024 * 1024;

  if (isTooLarge) {
    return {
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: `파일 크기는 ${MAX_FILE_SIZE}MB를 초과할 수 없어요.`,
      },
    };
  }

  const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
  if (!bucketName) {
    return {
      success: false,
      error: {
        code: 'STORAGE_BUCKET_NOT_SET',
        message: '스토리지 버킷이 설정되지 않았어요.',
      },
    };
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

  if (!data || !webpData) {
    return {
      success: false,
      error: {
        code: 'SUPABASE_UPLOAD_ERROR',
        message: `업로드 중 오류가 발생했어요.`,
      },
    };
  }

  if (error) {
    return {
      success: false,
      error: {
        code: 'SUPABASE_UPLOAD_ERROR',
        message: `업로드 중 오류가 발생했어요.`,
      },
    };
  }

  if (webpError) {
    return {
      success: false,
      error: {
        code: 'WEB_P_UPLOAD_ERROR',
        message: `WebP 업로드 중 오류가 발생했어요.`,
      },
    };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`;

  const response = await generateBlurDataUrl(imageUrl);

  if (!response.success) {
    return {
      success: false,
      error: response.error,
    };
  }

  const blurUrl = response.data;
  const webpUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${webpData.path}`;

  return {
    success: true,
    data: {
      path: data.path,
      url: imageUrl,
      blurUrl,
      webpUrl,
    },
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
): Promise<ApiResult<string>> {
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
    return {
      success: true,
      data: base64,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'BLUR_GENERATION_ERROR',
        message: `이미지 업로드에 실패했어요. ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      },
    };
  }
}

async function convertToWebPwidthSharp(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return await sharp(buffer).webp({ quality: 80 }).toBuffer();
}
