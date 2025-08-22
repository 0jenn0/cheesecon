export interface ImageUploadResult {
  path: string;
  url: string;
  blurUrl?: string | null;
  webpUrl?: string | null;
  isRepresentative?: boolean;
  posterUrl?: string | null;
  mp4Url?: string | null;
  webmUrl?: string | null;
}

export interface ImageUrlResult {
  publicUrl: string;
}

export interface UploadImageParams {
  file: File;
  bucket: string;
}
