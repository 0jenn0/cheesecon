export interface ImageUploadResult {
  path: string;
  url: string;
}

export interface ImageUrlResult {
  publicUrl: string;
}

export interface UploadImageParams {
  file: File;
  bucket: string;
}
