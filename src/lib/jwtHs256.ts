/**
 * Minimal HS256 JWT sign/verify using Web Crypto (works in Edge middleware and Node route handlers).
 */

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importHmacKey(secret: Uint8Array): Promise<CryptoKey> {
  const raw = new Uint8Array(secret.byteLength);
  raw.set(secret);
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function signJwtHs256(
  claims: Record<string, unknown>,
  secret: Uint8Array,
  expiresInSec: number
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { ...claims, iat: now, exp: now + expiresInSec };
  const encHeader = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const encPayload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signingInput = `${encHeader}.${encPayload}`;
  const key = await importHmacKey(secret);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
  const encSig = base64UrlEncode(new Uint8Array(sigBuf));
  return `${signingInput}.${encSig}`;
}

export async function verifyJwtHs256(token: string, secret: Uint8Array): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [h, p, s] = parts;
  if (!h || !p || !s) return false;
  const signingInput = `${h}.${p}`;
  let sigRaw: Uint8Array;
  try {
    sigRaw = base64UrlDecode(s);
  } catch {
    return false;
  }
  const sig = new Uint8Array(sigRaw.byteLength);
  sig.set(sigRaw);
  const key = await importHmacKey(secret);
  const ok = await crypto.subtle.verify("HMAC", key, sig, new TextEncoder().encode(signingInput));
  if (!ok) return false;
  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(p))) as { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
