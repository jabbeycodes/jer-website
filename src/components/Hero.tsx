import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63ad5080?w=1920&q=80')",
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20">
        <p className="text-[#C9A96E] text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">
          Jirapa Executive Residence
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          A Private Executive Residence in{" "}
          <span className="gold-gradient">Upper West Ghana</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 tracking-wide">
          Secure. Connected. Private.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/contact" className="btn-gold text-base">
            Request Availability
          </Link>
          <a href="#experience" className="btn-outline text-base">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Watch Video
          </a>
        </div>

        {/* Feature icons bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: "Electric Fencing", icon: "🛡️" },
            { label: "24/7 Surveillance", icon: "📹" },
            { label: "Starlink Internet", icon: "🛰️" },
            { label: "Private Compound", icon: "🏡" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs md:text-sm text-gray-300 tracking-wide uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}