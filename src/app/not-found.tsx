import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-[#C9A96E] mb-4">404</h1>
        <p className="text-white text-xl mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Page Not Found
        </p>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#C9A96E] text-[#0A0A0A] px-6 py-3 rounded-lg font-medium hover:bg-[#B8975E] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
