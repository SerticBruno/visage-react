import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth-constants';

export { ADMIN_SESSION_COOKIE };

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET nije postavljen u .env.local');
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    throw new Error('ADMIN_USERNAME i ADMIN_PASSWORD moraju biti postavljeni u .env.local');
  }

  return safeEqual(username, expectedUser) && safeEqual(password, expectedPass);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function createAdminSessionToken(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const payload = `admin:${expiresAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  if (signature.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  const [, expiresStr] = payload.split(':');
  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt)) return false;

  return Math.floor(Date.now() / 1000) < expiresAt;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function adminSessionCookieOptions(token: string) {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
  };
}

export function clearAdminSessionCookieOptions() {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };
}
