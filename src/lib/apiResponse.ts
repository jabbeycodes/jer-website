import { NextResponse } from "next/server";

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  Pragma: "no-cache",
} as const;

export const isProduction = process.env.NODE_ENV === "production";

/** JSON API response with cache disabled (reduces accidental caching of sensitive payloads). */
export function apiJson(data: unknown, init?: { status?: number }) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: { ...NO_STORE },
  });
}
