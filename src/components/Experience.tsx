export default function Experience() {
  const features = [
    "Spacious multi-room layout",
    "Indoor-outdoor living",
    "Large private compound",
    "Balcony & hosting areas",
  ];

  return (
    <section id="experience" className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">The Property</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Experience the <span className="gold-gradient">Residence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-xl overflow-hidden bg-[#111111] border border-[#1F1F1F] aspect-video">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/6s0ZPDT2wac?rel=0&modestbranding=1"
              title="Jirapa Executive Residence Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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

