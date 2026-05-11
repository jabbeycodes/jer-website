"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { HERO_SHOTS } from "@/data/heroShots";

type HeroSlide = { src: string; alt: string };

/** Time each slide is fully visible before crossfading to the next. */
const ROTATE_MS = 6000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [remoteShots, setRemoteShots] = useState<HeroSlide[] | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const slides = useMemo(() => {
    if (remoteShots && remoteShots.length > 0) return remoteShots;
    return HERO_SHOTS;
  }, [remoteShots]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/gallery-layout")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { hero?: HeroSlide[] } | null) => {
        if (cancelled || !data?.hero?.length) return;
        setRemoteShots(data.hero);
      })
      .catch(() => {
        /* keep bundled fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      {/* Darkening overlay + subtle vignette */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl mx-4 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            <video
              src="/videos/jirapa-tour.mp4"
              controls
              autoPlay
              className="w-full h-full"
              playsInline
            />
          </div>
        </div>
      )}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20">
        <p className="text-[#C9A96E] text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">
          Jirapa Executive Residence
        </p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A Private Executive Residence in{" "}
          <span className="gold-gradient">Upper West Ghana</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-10 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Secure. Connected. Private.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/contact" className="btn-gold text-base">
            Request Availability
          </Link>
          <button
            onClick={() => setShowVideo(true)}
            className="btn-outline text-base inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Video
          </button>
        </div>

        {/* Feature icons bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: "Electric Fencing", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            ) },
            { label: "24/7 Surveillance", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.043 47.043 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-3.138-.262 2.24 2.24 0 00-1.64.644l-.822.821a2.24 2.24 0 01-1.64.644h-.278" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
            ) },
            { label: "Starlink Internet", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>
            ) },
            { label: "Private Compound", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h1.5m13.5 0H21M3 6h1.5M19.5 6H21M3 9h1.5M19.5 9H21" /></svg>
            ) },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-[#C9A96E]">{item.icon}</span>
              <span className="text-xs md:text-sm text-gray-300 tracking-wide uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
