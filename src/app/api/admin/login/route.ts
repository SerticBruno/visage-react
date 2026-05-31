import { NextRequest, NextResponse } from 'next/server';
import {
  adminSessionCookieOptions,
  createAdminSessionToken,
  verifyAdminCredentials,
} from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Unesite korisničko ime i lozinku' }, { status: 400 });
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json({ error: 'Neispravni podaci za prijavu' }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminSessionCookieOptions(token));
    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Admin prijava nije konfigurirana' }, { status: 500 });
  }
}
