"use client";

import AnimatedSection, { StaggerContainer, StaggerItem, AnimatedCard } from "./AnimatedSection";

export default function Infrastructure() {
  const items = [
    {
      title: "24/7 Security",
      description: "Gated and monitored perimeter with cameras and electric fencing",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      ),
    },
    {
      title: "Starlink Internet",
      description: "High-speed operational connectivity independent of local networks",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>
      ),
    },
    {
      title: "Private Parking",
      description: "Secure on-site parking within the compound perimeter",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.25 17.25 0 00-3.109-9.331l-2.617-3.529A1.125 1.125 0 0014.605 4.5H9.395c-.425 0-.817.238-1.014.621l-2.617 3.529A17.25 17.25 0 003.375 14.25v3.375c0 .621.504 1.125 1.125 1.125H5.25" /></svg>
      ),
    },
    {
      title: "On-Request Services",
      description: "Housekeeping, meal preparation, and logistics support available",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-[#111111] border-y border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3">Built for Operations</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Infrastructure That Supports <span className="gold-gradient">High-Level Travel</span>
            </h2>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <AnimatedCard className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 text-center h-full">
                <div className="flex justify-center text-[#C9A96E] mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
