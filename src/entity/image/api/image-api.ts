'use server';

import 'server-only';
import sharp from 'sharp';
import { gifWebpToVideoFiles } from '@/shared/lib/media';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';
import type { ApiResult } from '@/shared/types';
import type { ImageUploadResult, ImageUrlResult } from '../type';
import { sanitizeFileName } from '../util';

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

async function toBlurDataURL(
  buf: Buffer,
  useTransparentBackground: boolean = true,
) {
  const tiny = sharp(buf).resize(24).blur().png({ quality: 40 });

  if (!useTransparentBackground) {
    tiny.flatten({ background: { r: 255, g: 255, b: 255 } });
  }

  const buffer = await tiny.toBuffer();
  const mimeType = useTransparentBackground ? 'image/png' : 'image/png';
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

async function isAnimated(buffer: Buffer, mime: string) {
  if (mime === 'image/gif') return true;
  if (mime === 'image/webp') {
    const meta = await sharp(buffer, { animated: true }).metadata();
    return (meta.pages ?? 1) > 1;
  }
  return false;
}

async function convertHeicToWebp(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer).webp({ quality: 80 }).toBuffer();
  } catch {
    return buffer;
  }
}

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
    let inputBuffer: Buffer = Buffer.from(new Uint8Array(inputArrayBuffer));
    const safeFileName = sanitizeFileName(file.name);
    const baseName = safeFileName.replace(/\.[^.]+$/, '');

    const isHeic =
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif');

    if (isHeic) {
      inputBuffer = await convertHeicToWebp(inputBuffer);
      const newFileName = safeFileName.replace(/\.(heic|heif)$/i, '.webp');

      const blob = new Blob([inputBuffer], { type: 'image/webp' });
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(newFileName, blob, {
          upsert: true,
          contentType: 'image/webp',
          cacheControl: '31536000, immutable',
        });

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_UPLOAD_ERROR',
            message: 'HEIC 변환 이미지 업로드 중 오류가 발생했어요.',
          },
        };
      }

      const imageUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${newFileName}`;

      const blur = await toBlurDataURL(inputBuffer, true);

      return {
        success: true,
        data: {
          path: newFileName,
          url: imageUrl,
          blurUrl: blur,
          posterUrl: imageUrl,
          webpUrl: imageUrl,
          mp4Url: '',
          webmUrl: '',
        },
      };
    }

    const animated = await isAnimated(inputBuffer, file.type || '');

    {
      const blob = new Blob([inputBuffer], {
        type: file.type || 'application/octet-stream',
      });
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(safeFileName, blob, {
          upsert: true,
          contentType: file.type || undefined,
          cacheControl: '31536000, immutable',
        });

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_UPLOAD_ERROR',
            message: '원본 업로드 중 오류가 발생했어요.',
          },
        };
      }
    }

    const imageUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${safeFileName}`;
    let blurBase64 = '';
    let posterUrl = '';
    let webpUrl = '';
    let mp4Url = '';
    let webmUrl = '';

    if (animated) {
      const { posterBuf, mp4Buf, webmBuf } = await gifWebpToVideoFiles(
        inputBuffer,
        {
          width: 720,
          fps: 18,
        },
      );

      blurBase64 = await toBlurDataURL(posterBuf, true);

      const posterName = `${baseName}_poster.jpg`;
      const mp4Name = `${baseName}.mp4`;
      const webmName = `${baseName}.webm`;

      const uploads = await Promise.all([
        supabase.storage
          .from(bucketName)
          .upload(
            posterName,
            new Blob([new Uint8Array(posterBuf)], { type: 'image/jpeg' }),
            {
              upsert: true,
              contentType: 'image/jpeg',
              cacheControl: '31536000, immutable',
            },
          ),
        supabase.storage
          .from(bucketName)
          .upload(
            mp4Name,
            new Blob([new Uint8Array(mp4Buf)], { type: 'video/mp4' }),
            {
              upsert: true,
              contentType: 'video/mp4',
              cacheControl: '31536000, immutable',
            },
          ),
        supabase.storage
          .from(bucketName)
          .upload(
            webmName,
            new Blob([new Uint8Array(webmBuf)], { type: 'video/webm' }),
            {
              upsert: true,
              contentType: 'video/webm',
              cacheControl: '31536000, immutable',
            },
          ),
      ]);

      if (uploads.some(({ error }) => error)) {
        return {
          success: false,
          error: {
            code: 'VIDEO_UPLOAD_ERROR',
            message: '비디오/포스터 업로드 중 오류가 발생했어요.',
          },
        };
      }

      posterUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${posterName}`;
      mp4Url = `${baseUrl}/storage/v1/object/public/${bucketName}/${mp4Name}`;
      webmUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${webmName}`;
    } else {
      const [webpBuffer, blur] = await Promise.all([
        sharp(inputBuffer)
          .webp({
            quality: 80,
          })
          .toBuffer(),
        toBlurDataURL(inputBuffer, true),
      ]);
      blurBase64 = blur;

      const webpName = `${baseName}.webp`;
      const { error, data } = await supabase.storage
        .from(bucketName)
        .upload(
          webpName,
          new Blob([new Uint8Array(webpBuffer)], { type: 'image/webp' }),
          {
            upsert: true,
            contentType: 'image/webp',
            cacheControl: '31536000, immutable',
          },
        );

      if (error || !data) {
        return {
          success: false,
          error: {
            code: 'WEBP_UPLOAD_ERROR',
            message: 'WebP 업로드 중 오류가 발생했어요.',
          },
        };
      }

      webpUrl = `${baseUrl}/storage/v1/object/public/${bucketName}/${data.path}`;
      posterUrl = imageUrl;
    }

    return {
      success: true,
      data: {
        path: safeFileName,
        url: imageUrl,
        blurUrl: blurBase64,
        posterUrl,
        webpUrl,
        mp4Url,
        webmUrl,
      },
    };
  } catch (e) {
    return {
      success: false,
      error: {
        code: 'UNEXPECTED',
        message: `이미지 업로드에 실패했어요. ${
          e instanceof Error ? e.message : '알 수 없는 오류'
        }`,
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
