import { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME } from "@/constants/admin";
import { apiJson } from "@/lib/apiResponse";
import { verifyAdminSessionToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminSessionToken(token))) {
    return apiJson({ ok: false }, { status: 401 });
  }
  return apiJson({ ok: true });
}
