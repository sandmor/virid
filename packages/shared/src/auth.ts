import { createHmac, timingSafeEqual } from 'node:crypto';

export type GuestSessionPayload = {
  uid: string;
  email: string;
  type: 'guest';
  iat: number;
  exp: number;
};

const GUEST_ALGO = 'sha256';

/**
 * Signs a guest session payload.
 */
export function signGuestSession(json: string, secret: string): string {
  return createHmac(GUEST_ALGO, secret).update(json).digest('hex');
}

/**
 * Verifies the HMAC signature of a guest session.
 */
export function verifyGuestSignature(
  json: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac(GUEST_ALGO, secret).update(json).digest('hex');
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const signatureBuffer = Buffer.from(signature, 'utf8');
  return (
    expectedBuffer.length === signatureBuffer.length &&
    timingSafeEqual(expectedBuffer, signatureBuffer)
  );
}

/**
 * Parses and validates a guest session cookie string.
 */
export function parseGuestSession(
  cookieValue: string | undefined,
  secret: string
): GuestSessionPayload | null {
  if (!cookieValue) return null;

  const [b64, sig] = cookieValue.split('.');
  if (!b64 || !sig) return null;

  try {
    const json = Buffer.from(b64, 'base64').toString('utf8');
    if (!verifyGuestSignature(json, sig, secret)) return null;

    const parsed: unknown = JSON.parse(json);
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      typeof (parsed as GuestSessionPayload).uid !== 'string' ||
      typeof (parsed as GuestSessionPayload).email !== 'string' ||
      (parsed as GuestSessionPayload).type !== 'guest' ||
      !Number.isFinite((parsed as GuestSessionPayload).iat) ||
      !Number.isFinite((parsed as GuestSessionPayload).exp) ||
      (parsed as GuestSessionPayload).exp <= Date.now()
    ) {
      return null;
    }
    return parsed as GuestSessionPayload;
  } catch {
    return null;
  }
}
