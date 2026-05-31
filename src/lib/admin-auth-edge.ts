/** Edge-compatible session verification for middleware */

const encoder = new TextEncoder();

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyAdminSessionTokenEdge(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = await hmacHex(payload, secret);
  if (!timingSafeEqualStr(signature, expected)) return false;

  const [, expiresStr] = payload.split(':');
  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt)) return false;

  return Math.floor(Date.now() / 1000) < expiresAt;
}
