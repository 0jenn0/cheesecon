'use server';

import { headers } from 'next/headers';
import 'server-only';
import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from '@/shared/lib/supabase/server';

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
async function signShareToken(payload: {
  id: string;
  typ: 'share';
  ver: 1;
  exp: number;
}) {
  const body = b64url(ENC.encode(JSON.stringify(payload)));
  const sig = b64url(await hmac(body));
  return `${body}.${sig}`;
}

/** 게시물 소유자만 실행 가능: 공유 링크 생성 (기본 24시간 유효) */
export async function createShareLinkAction(id: string, hours = 24) {
  if (!id) return { ok: false, message: 'invalid id' };
  if (!SECRET) return { ok: false, message: 'server misconfigured: SECRET' };

  // 로그인 사용자
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: 'unauthorized' };

  // 소유권 확인 + 비공개 여부 확인
  const admin = await createServerSupabaseAdminClient();
  const { data, error } = await admin
    .from('emoticon_sets')
    .select('user_id,is_private')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return { ok: false, message: 'not found' };
  if (data.user_id !== user.id) return { ok: false, message: 'forbidden' };
  const isPrivate = data.is_private;

  const exp = Date.now() + hours * 60 * 60 * 1000;
  const token = await signShareToken({ id, typ: 'share', ver: 1, exp });

  const origin =
    process.env.NEXT_PUBLIC_APP_ORIGIN || (await headers()).get('origin') || '';

  const url = isPrivate
    ? `${origin}/emoticon/access/${token}`
    : `${origin}/emoticon/${id}`;

  return { ok: true, url, exp };
}
