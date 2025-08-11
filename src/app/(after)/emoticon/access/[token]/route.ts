import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SECRET = process.env.EMOTICON_LOCK_SECRET || '';
const ENC = new TextEncoder();

function b64url(bytes: Uint8Array) {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
function b64urlToJson(input: string) {
  const pad = '='.repeat((4 - (input.length % 4)) % 4);
  const b64 = (input + pad).replace(/-/g, '+').replace(/_/g, '/');
  const json = Buffer.from(b64, 'base64').toString('utf8');
  return JSON.parse(json);
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
type SharePayload = { id: string; typ: 'share'; ver: 1; exp: number };
type LockPayload = { id: string; sub: string; exp: number };

async function verifyShareToken(token: string): Promise<SharePayload | null> {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const expected = b64url(await hmac(body));
    if (sig !== expected) return null;
    const payload = b64urlToJson(body) as SharePayload;
    if (payload.typ !== 'share' || payload.ver !== 1) return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
async function signLockToken(payload: LockPayload) {
  const body = b64url(ENC.encode(JSON.stringify(payload)));
  const sig = b64url(await hmac(body));
  return `${body}.${sig}`;
}

export async function GET(
  req: NextRequest,
  ctx: { params: { token: string } },
) {
  const token = ctx.params.token;
  const url = new URL(req.url);

  if (!SECRET) {
    return NextResponse.redirect(new URL('/login?error=misconfigured', url));
  }

  const share = await verifyShareToken(token);
  if (!share) {
    return NextResponse.redirect(new URL('/login?error=invalid_share', url));
  }

  // 공유 링크로 들어왔으니, 접근 쿠키 발급(24h) 후 정상 URL로 리다이렉트
  const accessToken = await signLockToken({
    id: share.id,
    sub: 'share',
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });
  const cookieName = `emoticon:${share.id}`;

  const res = NextResponse.redirect(new URL(`/emoticon/${share.id}`, url));
  res.cookies.set(cookieName, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  res.headers.set('Referrer-Policy', 'no-referrer');
  return res;
}
