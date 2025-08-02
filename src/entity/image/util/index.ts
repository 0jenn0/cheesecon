export function sanitizeFileName(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex);

  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const timestamp = Date.now();

  return `${sanitizedName}_${timestamp}${extension}`;
}
