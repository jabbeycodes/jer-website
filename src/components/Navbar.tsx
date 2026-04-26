"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/residence", label: "The Residence" },
    { href: "/corporate", label: "Corporate Stays" },
    { href: "/gallery", label: "Gallery" },
    { href: "/location", label: "Location" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/90 backdrop-blur-md border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold gold-gradient" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              JER
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#C9A96E] transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-gold text-sm">
              Request Availability
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-[#C9A96E]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#1F1F1F] pb-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm text-gray-300 hover:text-[#C9A96E] transition-colors tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-gold text-sm mt-4 inline-block">
              Request Availability
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
