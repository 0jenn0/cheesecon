export interface ImageUploadResult {
  path: string;
  url: string;
  blurUrl?: string | null;
  webpUrl?: string | null;
  isRepresentative?: boolean;
}

export interface ImageUrlResult {
  publicUrl: string;
}

export interface UploadImageParams {
  file: File;
  bucket: string;
}
