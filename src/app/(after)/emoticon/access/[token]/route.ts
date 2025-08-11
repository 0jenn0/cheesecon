import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SECRET = process.env.EMOTICON_LOCK_SECRET || '';
const ENC = new TextEncoder();

const EXPIRED_ROUTE = '/emoticon/share-expired';

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

type ShareVerifyResult =
  | { status: 'ok'; payload: SharePayload }
  | { status: 'expired'; payload: SharePayload }
  | { status: 'invalid' };

async function verifyShareTokenDetailed(
  token: string,
): Promise<ShareVerifyResult> {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return { status: 'invalid' };
    const expected = b64url(await hmac(body));
    if (sig !== expected) return { status: 'invalid' };
    const payload = b64urlToJson(body) as SharePayload;
    if (payload.typ !== 'share' || payload.ver !== 1)
      return { status: 'invalid' };
    if (Date.now() > payload.exp) return { status: 'expired', payload };
    return { status: 'ok', payload };
  } catch {
    return { status: 'invalid' };
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

  if (!SECRET)
    return NextResponse.redirect(new URL('/login?error=misconfigured', url));

  const result = await verifyShareTokenDetailed(token);

  if (result.status === 'expired') {
    const id = result.payload.id;
    return NextResponse.redirect(
      new URL(`${EXPIRED_ROUTE}?id=${encodeURIComponent(id)}`, url),
    );
  }
  if (result.status !== 'ok') {
    return NextResponse.redirect(new URL('/login?error=invalid_share', url));
  }

  const accessToken = await signLockToken({
    id: result.payload.id,
    sub: 'share',
    exp: Date.now() + 24 * 60 * 60 * 1000, // 링크 만료 시간 24시간
  });
  const cookieName = `emoticon:${result.payload.id}`;

  const res = NextResponse.redirect(
    new URL(`/emoticon/${result.payload.id}`, url),
  );
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
