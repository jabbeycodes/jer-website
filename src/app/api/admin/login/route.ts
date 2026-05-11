import { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME } from "@/constants/admin";
import { apiJson, isProduction } from "@/lib/apiResponse";
import { createAdminSessionToken, verifyAdminPassword } from "@/lib/adminAuth";
import { jerRateLimitAllow, rateLimitKey } from "@/lib/rateLimitSupabase";

function loginRateLimitMax(): number {
  const n = Number.parseInt(process.env.ADMIN_LOGIN_RATE_LIMIT_MAX ?? "10", 10);
  return Number.isFinite(n) && n > 0 ? n : 10;
}

function loginRateLimitWindowSec(): number {
  const n = Number.parseInt(process.env.ADMIN_LOGIN_RATE_LIMIT_WINDOW_SEC ?? "600", 10);
  return Number.isFinite(n) && n > 0 ? n : 600;
}

export async function POST(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return apiJson(
      { error: isProduction ? "Service temporarily unavailable." : "Missing ADMIN_PASSWORD environment variable." },
      { status: 503 }
    );
  }

  const rlKey = rateLimitKey("admin_login", req.headers);
  const allowed = await jerRateLimitAllow(rlKey, loginRateLimitMax(), loginRateLimitWindowSec());
  if (!allowed) {
    return apiJson(
      { error: isProduction ? "Too many attempts. Try again later." : "Rate limit exceeded for this IP." },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return apiJson({ error: "Invalid request." }, { status: 400 });
  }

  const guess = typeof body.password === "string" ? body.password : "";
  if (!verifyAdminPassword(guess, password)) {
    return apiJson({ error: "Invalid credentials." }, { status: 401 });
  }

  let token: string;
  try {
    token = await createAdminSessionToken();
  } catch {
    return apiJson(
      {
        error: isProduction
          ? "Service temporarily unavailable."
          : "Session signing failed (check ADMIN_SESSION_SECRET, min 32 characters).",
      },
      { status: 503 }
    );
  }

  const res = apiJson({ ok: true });
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
