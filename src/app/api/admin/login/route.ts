import { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME } from "@/constants/admin";
import { apiJson, isProduction } from "@/lib/apiResponse";
import { createAdminSessionToken, verifyAdminPassword } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return apiJson(
      { error: isProduction ? "Service temporarily unavailable." : "Missing ADMIN_PASSWORD environment variable." },
      { status: 503 }
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
