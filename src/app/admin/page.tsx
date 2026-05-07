"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Counts = {
  pending: number;
  confirmed: number;
  total: number;
};

/** Only allow same-origin admin paths after login (prevents open redirects). */
function safeInternalNext(raw: string | null): string | null {
  if (!raw || !raw.startsWith("/")) return null;
  if (raw.startsWith("//")) return null;
  if (!raw.startsWith("/admin")) return null;
  return raw;
}

export default function AdminPage() {
  const router = useRouter();
  const [counts, setCounts] = useState<Counts>({ pending: 0, confirmed: 0, total: 0 });
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [logoutBusy, setLogoutBusy] = useState(false);
  const [nextAfterLogin, setNextAfterLogin] = useState<string | null>(null);

  useEffect(() => {
    setNextAfterLogin(safeInternalNext(new URLSearchParams(window.location.search).get("next")));
  }, []);

  async function fetchCounts() {
    try {
      const res = await fetch("/api/admin/bookings-list", { credentials: "same-origin" });
      if (!res.ok) return;
      const data = await res.json();
      const bookings = data.bookings || [];
      setCounts({
        pending: bookings.filter((b: { status: string }) => b.status === "pending").length,
        confirmed: bookings.filter((b: { status: string }) => b.status === "confirmed").length,
        total: bookings.length,
      });
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to fetch counts:", err);
      }
    }
  }

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/me", { credentials: "same-origin" });
      if (res.ok) {
        setAuthed(true);
        await fetchCounts();
      }
    } catch {
      /* ignore */
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    void checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- session probe once on mount
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Sign in failed");
        return;
      }
      setPassword("");
      setAuthed(true);
      await fetchCounts();
      if (nextAfterLogin) {
        router.replace(nextAfterLogin);
      } else {
        router.replace("/admin");
      }
    } catch {
      setError("Network error. Try again.");
    }
  }

  async function handleLogout() {
    setLogoutBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
      setAuthed(false);
      setCounts({ pending: 0, confirmed: 0, total: 0 });
      router.replace("/admin");
    } finally {
      setLogoutBusy(false);
    }
  }

  if (checking && !authed) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-[#111111]">
          <p className="text-gray-500">Loading…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!authed) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-[#111111]">
          <form onSubmit={handleLogin} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              JER Admin
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Sign in with the admin password you were given. If you manage this site, configure it in your hosting environment (never in the browser).
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111111] border border-[#1F1F1F] rounded-lg px-4 py-3 text-white focus:border-[#C9A96E] focus:outline-none transition-colors mb-4"
              placeholder="Admin password"
              autoComplete="current-password"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button type="submit" className="btn-gold w-full justify-center">
              Sign In
            </button>
          </form>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-1">Admin Dashboard</p>
              <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Jirapa Executive Residence
              </h1>
            </div>
            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={logoutBusy}
              className="text-sm text-gray-400 hover:text-white border border-[#1F1F1F] rounded-lg px-4 py-2 disabled:opacity-50"
            >
              {logoutBusy ? "Signing out…" : "Sign out"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
              <p className="text-yellow-400 text-3xl font-bold">{counts.pending}</p>
              <p className="text-gray-400 text-sm mt-1">Pending Bookings</p>
            </div>
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
              <p className="text-green-400 text-3xl font-bold">{counts.confirmed}</p>
              <p className="text-gray-400 text-sm mt-1">Confirmed Bookings</p>
            </div>
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6">
              <p className="text-[#C9A96E] text-3xl font-bold">{counts.total}</p>
              <p className="text-gray-400 text-sm mt-1">Total Inquiries</p>
            </div>
          </div>

          <Link href="/admin/bookings" className="btn-gold inline-flex items-center">
            Manage Bookings
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
