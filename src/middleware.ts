import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME } from "@/constants/admin";
import { verifyJwtHs256 } from "@/lib/jwtHs256";

function sessionSecretKey(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) return null;
  return new TextEncoder().encode(s);
}

async function hasValidAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const key = sessionSecretKey();
  if (!key) return false;
  return verifyJwtHs256(token, key);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    if (
      pathname === "/api/admin/login" ||
      pathname === "/api/admin/logout" ||
      pathname === "/api/admin/me" ||
      pathname === "/api/admin/gallery-assets" ||
      pathname === "/api/admin/gallery-layout"
    ) {
      return NextResponse.next();
    }
    if (!(await hasValidAdminSession(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (
    pathname === "/admin/bookings" ||
    pathname.startsWith("/admin/bookings/") ||
    pathname === "/admin/gallery" ||
    pathname.startsWith("/admin/gallery/")
  ) {
    if (!(await hasValidAdminSession(request))) {
      const u = new URL("/admin", request.url);
      u.searchParams.set("next", pathname);
      return NextResponse.redirect(u);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/bookings", "/admin/bookings/:path*", "/admin/gallery", "/admin/gallery/:path*", "/api/admin/:path*"],
};
