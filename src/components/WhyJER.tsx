export default function WhyJER() {
  const features = [
    {
      title: "Security",
      subtitle: "Gated & Monitored",
      description: "Perimeter cameras, electric fencing, and whole-compound control reduce client anxiety and improve institutional confidence.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      ),
    },
    {
      title: "Connectivity",
      subtitle: "High-Speed Internet",
      description: "Starlink changes the category: guests can work, call, report and coordinate without depending on local network quality.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>
      ),
    },
    {
      title: "Privacy",
      subtitle: "Exclusive Access",
      description: "A private compound suited to short or extended stays. Hotels can feel operationally noisy — teams with sensitive work need a quiet environment.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Why Jirapa Executive <span className="gold-gradient">Residence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 card-hover">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {feature.title}
              </h3>
              <p className="text-[#C9A96E] text-sm mb-3 tracking-wide">{feature.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
