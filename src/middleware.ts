import { type NextRequest, NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { getEmoticonSetIsPrivate } from './entity/emoticon-set';
import { createServerSupabaseClient } from './shared/lib/supabase/server';

const ENC = new TextEncoder();
const SECRET = process.env.EMOTICON_LOCK_SECRET!;
if (!SECRET) {
  console.warn('EMOTICON_LOCK_SECRET is not set');
}

const EXPIRED_ROUTE = '/emoticon/access-expired';

// UUID v1~v5 검증 (대소문자 허용)
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isUuid = (s: string) => UUID_RE.test(s);

function b64urlEncode(buf: ArrayBuffer | Uint8Array) {
  const bin = String.fromCharCode(...new Uint8Array(buf));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(str: string) {
  const pad = '='.repeat((4 - (str.length % 4)) % 4);
  const b64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}
async function hmac(data: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    ENC.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  return crypto.subtle.sign('HMAC', key, ENC.encode(data));
}

export type LockPayload = { id: string; sub: string; exp: number };

export async function signLockToken(payload: LockPayload) {
  const body = b64urlEncode(ENC.encode(JSON.stringify(payload)));
  const sig = b64urlEncode(await hmac(body));
  return `${body}.${sig}`;
}
async function verifyLockTokenDetailed(token: string, expectId: string) {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return { status: 'invalid' as const };
    const expectedSig = b64urlEncode(await hmac(body));
    if (sig !== expectedSig) return { status: 'invalid' as const };
    const json = new TextDecoder().decode(b64urlDecode(body));
    const payload = JSON.parse(json) as LockPayload;
    if (payload.id !== expectId) return { status: 'invalid' as const };
    if (Date.now() > payload.exp)
      return { status: 'expired' as const, payload };
    return { status: 'ok' as const, payload };
  } catch {
    return { status: 'invalid' as const };
  }
}

const publicPaths = ['/login', '/popular', '/new', '/activity', '/emoticon'];
const authPaths = ['/auth/callback'];

function isPublicPath(pathname: string): boolean {
  return publicPaths.some((path) => pathname.startsWith(path));
}
function isAuthPath(pathname: string): boolean {
  return authPaths.some((path) => pathname.startsWith(path));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/popular', request.url));
  }

  if (isPublicPath(pathname)) return NextResponse.next();

  if (pathname.startsWith('/emoticon/access/')) {
    return NextResponse.next();
  }
  if (
    pathname.startsWith('/emoticon/access-expired') ||
    pathname.startsWith('/emoticon/share-expired')
  ) {
    return NextResponse.next();
  }

  if (isAuthPath(pathname)) return NextResponse.next();

  if (pathname.startsWith('/emoticon')) {
    if (pathname.startsWith('/emoticon/lock')) {
      return NextResponse.next();
    }

    const segs = pathname.split('/').filter(Boolean);
    const id = segs[1];

    if (id && isUuid(id)) {
      const cookieName = `emoticon:${id}`;
      const token = request.cookies.get(cookieName)?.value ?? null;

      const supabase = await createServerSupabaseClient();
      const { data: emoticonSetAuthor } = await supabase
        .from('emoticon_sets')
        .select('user_id')
        .eq('id', id)
        .single();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const isAuthor = emoticonSetAuthor?.user_id === user?.id;
      if (isAuthor) {
        return NextResponse.next();
      }
      const isLoggedIn = !!user;

      if (token) {
        const v = await verifyLockTokenDetailed(token, id);
        if (v.status === 'ok') {
          if (!isLoggedIn) {
            const nowPathWithSearch = pathname + (request.nextUrl.search || '');
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', nowPathWithSearch);
            return NextResponse.redirect(loginUrl);
          }
        } else if (v.status === 'expired') {
          const resp = NextResponse.redirect(
            new URL(
              `${EXPIRED_ROUTE}?id=${encodeURIComponent(id)}`,
              request.url,
            ),
          );
          resp.cookies.set(cookieName, '', { path: '/', maxAge: 0 });
          return resp;
        } else {
          const resp = NextResponse.redirect(
            new URL(`/emoticon/lock/${id}`, request.url),
          );
          resp.cookies.set(cookieName, '', { path: '/', maxAge: 0 });
          return resp;
        }
      } else {
        const isPrivate = await getEmoticonSetIsPrivate(id);
        if (isPrivate) {
          return NextResponse.redirect(
            new URL(`/emoticon/lock/${id}`, request.url),
          );
        }
      }
    }
  }

  const response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isPublicPath(pathname)) return response;

  if (!user) {
    const nowPathWithSearch = pathname + (request.nextUrl.search || '');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', nowPathWithSearch);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
