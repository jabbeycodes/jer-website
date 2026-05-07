import { ADMIN_COOKIE_NAME } from "@/constants/admin";
import { apiJson } from "@/lib/apiResponse";

export async function POST() {
  const res = apiJson({ ok: true });
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
