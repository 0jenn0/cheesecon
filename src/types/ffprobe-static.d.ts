declare module 'ffprobe-static' {
  const ffprobe: {
    path: string;
    version?: string;
    [k: string]: unknown;
  };

  export default ffprobe;
  export const path: string;
}
