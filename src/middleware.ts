import { type NextRequest, NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { getEmoticonSetIsPrivate } from './entity/emoticon-set';

const ENC = new TextEncoder();
const SECRET = process.env.EMOTICON_LOCK_SECRET!;
if (!SECRET) {
  console.warn('EMOTICON_LOCK_SECRET is not set');
}

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

export async function verifyLockToken(token: string, expectId: string) {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;

    const expectedSig = b64urlEncode(await hmac(body));
    if (sig !== expectedSig) return null;

    const json = new TextDecoder().decode(b64urlDecode(body));
    const payload = JSON.parse(json) as LockPayload;
    if (payload.id !== expectId) return null;
    if (Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
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

  if (isAuthPath(pathname)) return NextResponse.next();

  if (pathname.startsWith('/emoticon')) {
    if (pathname.startsWith('/emoticon/lock')) {
      return NextResponse.next();
    }

    const id = pathname.split('/').pop();
    if (id) {
      const cookieName = `emoticon:${id}`;
      const token = request.cookies.get(cookieName)?.value ?? null;

      if (token) {
        const ok = await verifyLockToken(token, id);
        if (ok) {
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
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
