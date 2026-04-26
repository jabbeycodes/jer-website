import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#1F1F1F] section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-3xl font-bold gold-gradient" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              JER
            </span>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              Jirapa Executive Residence<br />
              Secure. Connected. Private.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/residence" className="text-gray-400 hover:text-[#C9A96E] text-sm transition-colors">The Residence</Link>
              <Link href="/corporate" className="text-gray-400 hover:text-[#C9A96E] text-sm transition-colors">Corporate Stays</Link>
              <Link href="/gallery" className="text-gray-400 hover:text-[#C9A96E] text-sm transition-colors">Gallery</Link>
              <Link href="/location" className="text-gray-400 hover:text-[#C9A96E] text-sm transition-colors">Location</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A96E] font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:stay@jiraparesidence.com" className="text-gray-400 hover:text-[#C9A96E] text-sm transition-colors">
                stay@jiraparesidence.com
              </a>
              <a href="https://wa.me/14438501407" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A96E] text-sm transition-colors">
                WhatsApp Inquiry
              </a>
              <p className="text-gray-500 text-sm">
                High Tension North St<br />
                Jirapa, Upper West Region<br />
                Ghana · XJ-0002-1275
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1F1F1F] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Jirapa Executive Residence. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-gray-500 hover:text-[#C9A96E] text-xs transition-colors">Contact</Link>
            <a href="https://wa.me/14438501407" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C9A96E] text-xs transition-colors">WhatsApp</a>
            <a href="mailto:stay@jiraparesidence.com" className="text-gray-500 hover:text-[#C9A96E] text-xs transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
