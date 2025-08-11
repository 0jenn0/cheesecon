'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { createServerSupabaseClient } from '@/shared/lib/supabase/server';

const SECRET = process.env.EMOTICON_LOCK_SECRET || '';

const ENC = new TextEncoder();
function b64url(bytes: Uint8Array) {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
async function hmac(data: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    ENC.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return new Uint8Array(
    await crypto.subtle.sign('HMAC', key, ENC.encode(data)),
  );
}
async function signLockToken(payload: {
  id: string;
  sub: string;
  exp: number;
}) {
  const body = b64url(ENC.encode(JSON.stringify(payload)));
  const sig = b64url(await hmac(body));
  return `${body}.${sig}`;
}

export async function unlockEmoticonAction(input: {
  id: string;
  password: string;
}) {
  const id = input?.id?.trim();
  const password = input?.password?.trim();

  if (!id || !password) {
    return { ok: false, message: '잘못된 입력입니다.' };
  }
  if (!SECRET) {
    return {
      ok: false,
      message: '서버 환경변수가 설정되지 않았습니다(SECRET).',
    };
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('emoticon_sets')
    .select('id, is_private, password_hash')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('[unlock] DB error:', error);
    return { ok: false, message: 'DB 오류가 발생했습니다.' };
  }
  if (!data) {
    return { ok: false, message: '게시물을 찾을 수 없습니다.' };
  }

  const hash = (data.password_hash as string | null) ?? null;
  if (!hash) {
    return { ok: false, message: '비밀번호가 설정되지 않았습니다.' };
  }

  const ok = await bcrypt.compare(password, hash);
  if (!ok) {
    return { ok: false, message: '비밀번호가 올바르지 않습니다.' };
  }

  const exp = Date.now() + 24 * 60 * 60 * 1000;
  const token = await signLockToken({ id, sub: 'anon', exp });

  (await cookies()).set(`emoticon:${id}`, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  redirect(`/emoticon/${id}`);
}
