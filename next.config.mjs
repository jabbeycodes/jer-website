/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

/**
 * Defense in depth: limits where scripts, frames, and connections can load from.
 * Dev keeps 'unsafe-eval' for Next.js tooling; prod omits it.
 */
function contentSecurityPolicy() {
  const scriptSrc = isProd
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
  const parts = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://*.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  if (isProd) {
    parts.push("upgrade-insecure-requests");
  }
  return parts.join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

if (isProd) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  });
}

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
