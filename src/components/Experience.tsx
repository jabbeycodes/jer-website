export default function Experience() {
  const features = [
    "Spacious multi-room layout",
    "Indoor-outdoor living",
    "Large private compound",
    "Balcony & hosting areas",
  ];

  return (
    <section id="experience" className="section-padding bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">The Property</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Experience the <span className="gold-gradient">Residence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video placeholder */}
          <div className="relative rounded-xl overflow-hidden bg-[#111111] border border-[#1F1F1F] aspect-video flex items-center justify-center group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-50 transition-opacity"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80')",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-[#C9A96E] flex items-center justify-center group-hover:bg-[#C9A96E]/10 transition-colors">
                <svg className="w-7 h-7 text-[#C9A96E] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <span className="text-[#C9A96E] text-sm tracking-wide">Watch the Tour</span>
            </div>
          </div>

          {/* Features list */}
          <div className="flex flex-col gap-6">
            <p className="text-gray-300 leading-relaxed">
              The property wins because it bundles presence, protection and connectivity in a single private residence. Executive-grade exterior presence and arrival impact set the tone from the moment you arrive.
            </p>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#C9A96E] flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { label: "CCTV", desc: "Full coverage" },
                { label: "Electric Fence", desc: "Perimeter security" },
                { label: "Starlink", desc: "High-speed internet" },
                { label: "Private", desc: "Whole compound" },
              ].map((item) => (
                <div key={item.label} className="bg-[#111111] border border-[#1F1F1F] rounded-lg p-3 text-center">
                  <p className="text-[#C9A96E] text-sm font-semibold">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}