'use server';

import sharp from 'sharp';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import { ApiResult } from '@/shared/types';
import { ImageUploadResult, ImageUrlResult } from '../type';
import { sanitizeFileName } from '../util';

export async function uploadImageToBucket(
  formData: FormData,
): Promise<ApiResult<ImageUploadResult>> {
  try {
    const file = formData.get('file') as File | null;

    if (!file) {
      return {
        success: false,
        error: { code: 'FILE_NOT_FOUND', message: '파일이 없어요.' },
      };
    }

    const MAX_FILE_SIZE_MB = 2;
    const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_FILE_BYTES) {
      return {
        success: false,
        error: {
          code: 'FILE_TOO_LARGE',
          message: `파일 크기는 ${MAX_FILE_SIZE_MB}MB를 초과할 수 없어요.`,
        },
      };
    }

    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!bucketName || !baseUrl) {
      return {
        success: false,
        error: {
          code: 'STORAGE_BUCKET_NOT_SET',
          message: '스토리지 버킷/URL이 설정되지 않았어요.',
        },
      };
    }

    const supabase = await createServerSupabaseClient();

    const inputArrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(inputArrayBuffer);

    const [webpBuffer, blurBase64] = await Promise.all([
      sharp(inputBuffer).webp({ quality: 80 }).toBuffer(),
      sharp(inputBuffer)
        .resize(10, 10, { fit: 'inside' })
        .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .blur(1)
        .toBuffer()
        .then((b) => `data:image/png;base64,${b.toString('base64')}`),
    ]);

    if (!webpBuffer || !blurBase64) {
      return {
        success: false,
        error: {
          code: 'IMAGE_PROCESSING_ERROR',
          message: '이미지 처리에 실패했어요.',
        },
      };
    }

    const safeFileName = sanitizeFileName(file.name);
    const webpName = safeFileName.replace(/\.[^.]+$/, '') + '.webp';

    {
      const blob = new Blob([inputBuffer], {
        type: file.type || 'application/octet-stream',
      });
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(safeFileName, blob, {
          upsert: true,
          contentType: file.type || undefined,
        });

      if (error || !data) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_UPLOAD_ERROR',
            message: '원본 업로드 중 오류가 발생했어요.',
          },
        };
      }
    }

    let webpPath = '';
    {
      const blob = new Blob([webpBuffer], { type: 'image/webp' });
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(webpName, blob, { upsert: true, contentType: 'image/webp' });

      if (error || !data) {
        return {
          success: false,
          error: {
            code: 'WEBP_UPLOAD_ERROR',
            message: 'WebP 업로드 중 오류가 발생했어요.',
          },
        };
      }
      webpPath = data.path;
    }

    const imageUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${safeFileName}`;
    const webpUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${webpPath}`;

    return {
      success: true,
      data: {
        path: safeFileName,
        url: imageUrl,
        blurUrl: blurBase64,
        webpUrl,
      },
    };
  } catch (e) {
    return {
      success: false,
      error: {
        code: 'UNEXPECTED',
        message: `이미지 업로드에 실패했어요. ${e instanceof Error ? e.message : '알 수 없는 오류'}`,
      },
    };
  }
}

export async function getImageUrl(path: string): Promise<ImageUrlResult> {
  const supabase = await createServerSupabaseClient();
  const { data } = supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '')
    .getPublicUrl(path);
  return data;
}
