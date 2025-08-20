/* eslint-disable @typescript-eslint/no-explicit-any */
import ff from 'fluent-ffmpeg';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import 'server-only';

let inited = false;

export async function ensureFfmpeg() {
  if (inited) return ff;

  const [{ path: ffmpegPath }, { path: ffprobePath }] = await Promise.all([
    import('@ffmpeg-installer/ffmpeg'),
    import('@ffprobe-installer/ffprobe'),
  ]);

  // 바이너리 존재 확인
  await fs.stat(ffmpegPath);
  await fs.stat(ffprobePath);

  ff.setFfmpegPath(ffmpegPath);
  ff.setFfprobePath(ffprobePath);

  inited = true;
  return ff;
}

async function ffmpegTranscode(
  inPath: string,
  outPath: string,
  outputArgs: string[],
  inputArgs: string[] = [],
) {
  const lib = await ensureFfmpeg();
  const stderr: string[] = [];

  await new Promise<void>((resolve, reject) => {
    lib(inPath)
      .inputOptions(inputArgs)
      .outputOptions(outputArgs)
      .addOption('-y')
      .on('start', (cmd) => console.debug('[ffmpeg start]', cmd))
      .on('stderr', (line) => stderr.push(line))
      .on('error', (err) => {
        (err as any).stderr = stderr.join('\n');
        reject(err);
      })
      .on('end', () => resolve())
      .save(outPath);
  });

  await fs.access(outPath);
}

async function extractPosterLastFrame(
  inPath: string,
  posterPath: string,
  width: number,
  duration: number,
) {
  const baseOutput = [
    '-f',
    'image2',
    '-vcodec',
    'mjpeg',
    '-vf',
    `scale='min(${width},iw)':'-2':flags=lanczos`,
    '-q:v',
    '2',
    '-an',
    '-sn',
    '-dn',
  ];

  const epsilon = 0.1; // 100ms
  const trySeekInput =
    duration > 0
      ? ['-ss', Math.max(0, duration - epsilon).toFixed(2)]
      : ['-sseof', `-${epsilon.toFixed(2)}`];

  try {
    await ffmpegTranscode(
      inPath,
      posterPath,
      [...baseOutput, '-frames:v', '1'],
      trySeekInput,
    );
    return;
  } catch {
    // fallthrough
  }

  await ffmpegTranscode(
    inPath,
    posterPath,
    [...baseOutput, '-update', '1'],
    [],
  );
}

export async function ffmpegTranscodeVideoMp4(
  inPath: string,
  outPath: string,
  width: number,
  fps: number,
) {
  await ffmpegTranscode(inPath, outPath, [
    '-vf',
    `scale='min(${width},iw)':'-2':flags=lanczos,fps=${fps}`,
    '-c:v',
    'libx264',
    '-profile:v',
    'baseline',
    '-level',
    '3.1',
    '-crf',
    '23',
    '-preset',
    'veryfast',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
  ]);
}

export async function ffmpegTranscodeVideoWebm(
  inPath: string,
  outPath: string,
  width: number,
  fps: number,
) {
  await ffmpegTranscode(inPath, outPath, [
    '-vf',
    `scale='min(${width},iw)':'-2':flags=lanczos,fps=${fps}`,
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '33',
    '-row-mt',
    '1',
  ]);
}

export async function gifWebpToVideoFiles(
  input: Buffer,
  opts?: { width?: number; fps?: number },
) {
  const { width = 720, fps = 18 } = opts || {};

  const workdir = await fs.mkdtemp(join(tmpdir(), 'ffx-'));
  const inPath = join(workdir, `${randomUUID()}.bin`);
  await fs.writeFile(inPath, input);

  const posterPath = join(workdir, `${randomUUID()}.jpg`);
  const mp4Path = join(workdir, `${randomUUID()}.mp4`);
  const webmPath = join(workdir, `${randomUUID()}.webm`);

  try {
    const lib = await ensureFfmpeg();

    const duration = await new Promise<number>((resolve, reject) => {
      lib.ffprobe(inPath, (err, metadata) => {
        if (err) return reject(err);
        const fmtDur = Number(metadata.format?.duration ?? 0) || 0;
        const streamDur =
          Number(
            (metadata.streams || []).find((s: any) => s.codec_type === 'video')
              ?.duration ?? 0,
          ) || 0;
        resolve(fmtDur || streamDur || 0);
      });
    });

    await extractPosterLastFrame(inPath, posterPath, width, duration);

    await ffmpegTranscodeVideoMp4(inPath, mp4Path, width, fps);
    await ffmpegTranscodeVideoWebm(inPath, webmPath, width, fps);

    const [posterBuf, mp4Buf, webmBuf] = await Promise.all([
      fs.readFile(posterPath),
      fs.readFile(mp4Path),
      fs.readFile(webmPath),
    ]);

    await fs.rm(workdir, { recursive: true, force: true });

    return { posterBuf, mp4Buf, webmBuf };
  } catch (error) {
    await fs.rm(workdir, { recursive: true, force: true });
    console.error(
      'GIF/WebP를 비디오로 변환하는 중 오류:',
      (error as any)?.stderr || error,
    );
    throw new Error(
      `비디오 변환에 실패했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
}
