import { timingSafeEqual } from "node:crypto";

import { signJwtHs256, verifyJwtHs256 } from "@/lib/jwtHs256";

const MIN_SECRET_LEN = 32;

export function getAdminSessionSecretKey(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < MIN_SECRET_LEN) return null;
  return new TextEncoder().encode(s);
}

/** Timing-safe compare when lengths match. */
export function verifyAdminPassword(guess: string, expected: string): boolean {
  try {
    const a = Buffer.from(guess, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function createAdminSessionToken(): Promise<string> {
  const key = getAdminSessionSecretKey();
  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET is missing or shorter than 32 characters.");
  }
  return signJwtHs256({ role: "admin" }, key, 60 * 60 * 24 * 7);
}

export async function verifyAdminSessionToken(token: string): Promise<boolean> {
  const key = getAdminSessionSecretKey();
  if (!key) return false;
  return verifyJwtHs256(token, key);
}
