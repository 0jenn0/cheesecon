import { ApiResult } from '@/shared/types';
import { ImageUploadResult, ImageUrlResult } from '../type';

export type UploadImageRequest = FormData;

export type GetImageUrlRequest = {
  path: string;
};

export type UploadImageResponse = ImageUploadResult;
export type GetImageUrlResponse = ImageUrlResult;

export type UploadImageResult = ApiResult<UploadImageResponse>;
export type GetImageUrlResult = ApiResult<GetImageUrlResponse>;
