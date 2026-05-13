"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DESIGNED_FOR_CARD_META } from "@/lib/galleryDefaults";

type Slide = { src: string; alt: string };

type LayoutApi = {
  hero: Slide[];
  galleryPage: Slide[];
  corporateHero: Slide;
  residenceHero: Slide;
  designedFor: Slide[];
  persisted: boolean;
  builtInDefaults: {
    hero: Slide[];
    galleryPage: Slide[];
    corporateHero: Slide;
    residenceHero: Slide;
    designedFor: Slide[];
  };
};

export default function AdminGalleryPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [assets, setAssets] = useState<Slide[]>([]);
  const [hero, setHero] = useState<Slide[]>([]);
  const [galleryPage, setGalleryPage] = useState<Slide[]>([]);
  const [corporateHero, setCorporateHero] = useState<Slide>({ src: "", alt: "" });
  const [residenceHero, setResidenceHero] = useState<Slide>({ src: "", alt: "" });
  const [designedFor, setDesignedFor] = useState<Slide[]>([]);
  const [builtInDefaults, setBuiltInDefaults] = useState<LayoutApi["builtInDefaults"] | null>(null);
  const [persisted, setPersisted] = useState(false);
  const [saveBusy, setSaveBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickHero, setPickHero] = useState("");
  const [pickGallery, setPickGallery] = useState("");

  const [pendingDelete, setPendingDelete] = useState<{ list: string; index: number } | null>(null);

  const loadAll = useCallback(async () => {
    setError(null);
    const [me, layoutRes, assetsRes] = await Promise.all([
      fetch("/api/admin/me", { credentials: "same-origin" }),
      fetch("/api/admin/gallery-layout", { credentials: "same-origin" }),
      fetch("/api/admin/gallery-assets", { credentials: "same-origin" }),
    ]);

    if (!me.ok) {
      setRedirecting(true);
      router.replace("/admin?next=/admin/gallery");
      return;
    }

    if (!layoutRes.ok || !assetsRes.ok) {
      setError("Could not load gallery settings or file list.");
      setAuthed(true);
      setChecking(false);
      return;
    }

    const layout = (await layoutRes.json()) as LayoutApi;
    const assetsJson = (await assetsRes.json()) as { assets: Slide[] };

    setHero(layout.hero);
    setGalleryPage(layout.galleryPage);
    setCorporateHero(layout.corporateHero);
    setResidenceHero(layout.residenceHero);
    setDesignedFor(layout.designedFor);
    setPersisted(layout.persisted);
    setBuiltInDefaults(layout.builtInDefaults);
    setAssets(assetsJson.assets || []);
    setAuthed(true);
    setChecking(false);
  }, [router]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  function applyAssetBySrc(src: string): Slide | null {
    const asset = assets.find((a) => a.src === src);
    return asset ? { src: asset.src, alt: asset.alt } : null;
  }

  async function save() {
    setSaveBusy(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery-layout", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hero,
          galleryPage,
          corporateHero,
          residenceHero,
          designedFor,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Save failed.");
        return;
      }
      setMessage("Saved. Refresh public pages to verify (homepage, /gallery, /corporate, /residence).");
      setPersisted(true);
    } finally {
      setSaveBusy(false);
    }
  }

  function move(list: Slide[], setList: (v: Slide[]) => void, index: number, dir: -1 | 1) {
    const next = index + dir;
    if (next < 0 || next >= list.length) return;
    const copy = [...list];
    const t = copy[index];
    copy[index] = copy[next]!;
    copy[next] = t!;
    setList(copy);
  }

  function addSlide(pick: string, list: Slide[], setList: (v: Slide[]) => void, setPick: (v: string) => void) {
    if (!pick) return;
    const asset = assets.find((a) => a.src === pick);
    if (!asset) return;
    if (list.some((s) => s.src === asset.src)) {
      setError("That image is already in this list.");
      return;
    }
    setList([...list, { src: asset.src, alt: asset.alt }]);
    setPick("");
    setError(null);
  }

  function updateAlt(list: Slide[], setList: (v: Slide[]) => void, index: number, alt: string) {
    const copy = [...list];
    copy[index] = { ...copy[index]!, alt };
    setList(copy);
  }

  function removeAt(list: Slide[], setList: (v: Slide[]) => void, index: number, listName: string) {
    // Two-tap delete: first tap marks, second tap confirms
    if (pendingDelete?.list === listName && pendingDelete?.index === index) {
      setList(list.filter((_, i) => i !== index));
      setPendingDelete(null);
      return;
    }
    setPendingDelete({ list: listName, index });
    // Auto-clear after 3 seconds
    setTimeout(() => setPendingDelete((prev) => (prev?.list === listName && prev?.index === index ? null : prev)), 3000);
  }

  function applyBuiltInDefaults() {
    if (!builtInDefaults) return;
    setHero(builtInDefaults.hero.map((s) => ({ ...s })));
    setGalleryPage(builtInDefaults.galleryPage.map((s) => ({ ...s })));
    setCorporateHero({ ...builtInDefaults.corporateHero });
    setResidenceHero({ ...builtInDefaults.residenceHero });
    setDesignedFor(builtInDefaults.designedFor.map((s) => ({ ...s })));
    setMessage("Editor reset to built-in defaults (not saved yet).");
    setError(null);
  }

  function setDesignedSlide(index: number, src: string) {
    const next = applyAssetBySrc(src);
    if (!next) return;
    setDesignedFor((prev) => {
      const copy = [...prev];
      copy[index] = next;
      return copy;
    });
    setError(null);
  }

  function updateDesignedAlt(index: number, alt: string) {
    setDesignedFor((prev) => {
      const copy = [...prev];
      if (copy[index]) copy[index] = { ...copy[index]!, alt };
      return copy;
    });
  }

  if (redirecting || (checking && !authed)) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-[#111111]">
          <p className="text-gray-500">{redirecting ? "Redirecting to sign in…" : "Loading…"}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!authed) {
    return null;
  }

  const assetOptions = assets.filter((a) => /\.(jpe?g|webp)$/i.test(a.src));

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-1">Admin</p>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Site images
              </h1>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">
                Control the homepage hero, gallery grid, subpage hero backgrounds, and the four “Designed for” cards. Files must live under{" "}
                <code className="text-gray-400">public/</code> or <code className="text-gray-400">public/gallery/</code> (deploy or commit
                files, then reload this page).
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin" className="text-sm text-gray-400 hover:text-white border border-[#1F1F1F] rounded-lg px-4 py-2">
                Dashboard
              </Link>
              <Link href="/admin/bookings" className="text-sm text-gray-400 hover:text-white border border-[#1F1F1F] rounded-lg px-4 py-2">
                Bookings
              </Link>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
          )}
          {message && (
            <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">{message}</div>
          )}

          <div className="flex flex-wrap gap-3 mb-10">
            <button type="button" onClick={() => void save()} disabled={saveBusy} className="btn-gold text-sm">
              {saveBusy ? "Saving…" : "Save to site"}
            </button>
            <button
              type="button"
              onClick={() => applyBuiltInDefaults()}
              className="text-sm text-gray-400 hover:text-white border border-[#1F1F1F] rounded-lg px-4 py-2"
            >
              Reset editor to built-in defaults
            </button>
            <span className="text-xs text-gray-500 self-center">
              {persisted ? "Layout is stored in Supabase." : "No saved layout yet — defaults show until you save."}
            </span>
          </div>

          <section className="mb-14">
            <h2 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Homepage hero slideshow
            </h2>
            <p className="text-gray-500 text-sm mb-4">Order matters. At least one slide is required.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <select
                value={pickHero}
                onChange={(e) => setPickHero(e.target.value)}
                className="bg-[#111111] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white min-w-[200px]"
              >
                <option value="">Add image…</option>
                {assetOptions.map((a) => (
                  <option key={a.src} value={a.src}>
                    {a.src}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => addSlide(pickHero, hero, setHero, setPickHero)}
                className="text-sm border border-[#C9A96E]/50 text-[#C9A96E] rounded-lg px-4 py-2 hover:bg-[#C9A96E]/10"
              >
                Add to hero
              </button>
            </div>

            <ul className="space-y-4">
              {hero.map((slide, index) => (
                <li key={`${slide.src}-${index}`} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-40 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.src} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-xs text-gray-500 truncate">{slide.src}</p>
                    <label className="block text-xs text-gray-400">Alt text</label>
                    <input
                      value={slide.alt}
                      onChange={(e) => updateAlt(hero, setHero, index, e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                    />
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => move(hero, setHero, index, -1)}
                        disabled={index === 0}
                        className="text-xs border border-[#1F1F1F] rounded px-2 py-1 text-gray-400 disabled:opacity-30"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => move(hero, setHero, index, 1)}
                        disabled={index === hero.length - 1}
                        className="text-xs border border-[#1F1F1F] rounded px-2 py-1 text-gray-400 disabled:opacity-30"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAt(hero, setHero, index, "hero")}
                        className={`text-xs border rounded px-2 py-1 transition-colors ${
                          pendingDelete?.list === "hero" && pendingDelete?.index === index
                            ? "border-red-500 bg-red-500/20 text-red-300"
                            : "border-red-500/40 text-red-400 hover:bg-red-500/10"
                        }`}
                      >
                        {pendingDelete?.list === "hero" && pendingDelete?.index === index ? "Confirm remove?" : "Remove"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {hero.length === 0 && <p className="text-amber-400/90 text-sm">Add at least one hero slide before saving.</p>}
          </section>

          <section className="mb-14">
            <h2 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              /gallery page grid
            </h2>
            <p className="text-gray-500 text-sm mb-4">You can leave this empty to hide all images on the gallery page.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <select
                value={pickGallery}
                onChange={(e) => setPickGallery(e.target.value)}
                className="bg-[#111111] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white min-w-[200px]"
              >
                <option value="">Add image…</option>
                {assetOptions.map((a) => (
                  <option key={`g-${a.src}`} value={a.src}>
                    {a.src}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => addSlide(pickGallery, galleryPage, setGalleryPage, setPickGallery)}
                className="text-sm border border-[#C9A96E]/50 text-[#C9A96E] rounded-lg px-4 py-2 hover:bg-[#C9A96E]/10"
              >
                Add to gallery page
              </button>
            </div>

            <ul className="space-y-4">
              {galleryPage.map((slide, index) => (
                <li key={`${slide.src}-g-${index}`} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-40 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.src} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-xs text-gray-500 truncate">{slide.src}</p>
                    <label className="block text-xs text-gray-400">Alt text</label>
                    <input
                      value={slide.alt}
                      onChange={(e) => updateAlt(galleryPage, setGalleryPage, index, e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                    />
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => move(galleryPage, setGalleryPage, index, -1)}
                        disabled={index === 0}
                        className="text-xs border border-[#1F1F1F] rounded px-2 py-1 text-gray-400 disabled:opacity-30"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => move(galleryPage, setGalleryPage, index, 1)}
                        disabled={index === galleryPage.length - 1}
                        className="text-xs border border-[#1F1F1F] rounded px-2 py-1 text-gray-400 disabled:opacity-30"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAt(galleryPage, setGalleryPage, index, "galleryPage")}
                        className={`text-xs border rounded px-2 py-1 transition-colors ${
                          pendingDelete?.list === "galleryPage" && pendingDelete?.index === index
                            ? "border-red-500 bg-red-500/20 text-red-300"
                            : "border-red-500/40 text-red-400 hover:bg-red-500/10"
                        }`}
                      >
                        {pendingDelete?.list === "galleryPage" && pendingDelete?.index === index ? "Confirm remove?" : "Remove"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-14 space-y-10">
            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Subpage hero backgrounds
            </h2>

            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4 space-y-3">
              <p className="text-[#C9A96E] text-sm font-medium">/corporate</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={corporateHero.src} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block text-xs text-gray-400">Image</label>
                  <select
                    value={corporateHero.src}
                    onChange={(e) => {
                      const next = applyAssetBySrc(e.target.value);
                      if (next) setCorporateHero(next);
                    }}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                  >
                    {assetOptions.map((a) => (
                      <option key={`c-${a.src}`} value={a.src}>
                        {a.src}
                      </option>
                    ))}
                  </select>
                  <label className="block text-xs text-gray-400">Alt text</label>
                  <input
                    value={corporateHero.alt}
                    onChange={(e) => setCorporateHero((s) => ({ ...s, alt: e.target.value }))}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4 space-y-3">
              <p className="text-[#C9A96E] text-sm font-medium">/residence</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={residenceHero.src} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="block text-xs text-gray-400">Image</label>
                  <select
                    value={residenceHero.src}
                    onChange={(e) => {
                      const next = applyAssetBySrc(e.target.value);
                      if (next) setResidenceHero(next);
                    }}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                  >
                    {assetOptions.map((a) => (
                      <option key={`r-${a.src}`} value={a.src}>
                        {a.src}
                      </option>
                    ))}
                  </select>
                  <label className="block text-xs text-gray-400">Alt text</label>
                  <input
                    value={residenceHero.alt}
                    onChange={(e) => setResidenceHero((s) => ({ ...s, alt: e.target.value }))}
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Homepage — Designed for (four cards)
            </h2>
            <p className="text-gray-500 text-sm mb-6">Order matches the site: NGO, Government, Diaspora, Private retreat.</p>

            <div className="space-y-6">
              {DESIGNED_FOR_CARD_META.map((meta, index) => {
                const slide = designedFor[index] ?? { src: "", alt: "" };
                return (
                  <div key={meta.title} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4 space-y-3">
                    <p className="text-white text-sm font-medium">{meta.title}</p>
                    <p className="text-gray-500 text-xs">{meta.description}</p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-48 aspect-[3/2] rounded-lg overflow-hidden bg-black flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slide.src} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="block text-xs text-gray-400">Image</label>
                        <select
                          value={slide.src}
                          onChange={(e) => setDesignedSlide(index, e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                        >
                          {assetOptions.map((a) => (
                            <option key={`d-${index}-${a.src}`} value={a.src}>
                              {a.src}
                            </option>
                          ))}
                        </select>
                        <label className="block text-xs text-gray-400">Alt text</label>
                        <input
                          value={slide.alt}
                          onChange={(e) => updateDesignedAlt(index, e.target.value)}
                          className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
