"use client";

import Link from "next/link";
import { useState } from "react";
import { Film, Tv, Heart, Grid, Menu, X, Search, Clapperboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo - F Cinema Box on the RIGHT + Online Glow */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" dir="ltr">
          {/* Logo Badge (F + Cinema Icon + Online Pulse) */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-orange-500/40 ring-2 ring-orange-400/30 group-hover:scale-105 transition shrink-0">
            <span>F</span>
            
            {/* Online Green Pulse Dot */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-slate-950" />
            </span>

            {/* Cinema Clapper Icon Badge */}
            <span className="absolute -bottom-1 -left-1 bg-slate-950/90 text-orange-400 p-0.5 rounded-md ring-1 ring-orange-500/40">
              <Clapperboard className="w-3 h-3 animate-pulse" />
            </span>
          </div>

          {/* Text Title */}
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-white group-hover:text-orange-400 transition leading-none">
              FTVISION
            </span>
            <span className="text-[9.5px] font-bold text-orange-400/90 tracking-widest mt-0.5 flex items-center gap-1">
              <span>STREAM HUB</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm hidden sm:block">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أنمي أو فيلم..."
              className="w-full bg-slate-900/90 text-sm text-white placeholder-slate-400 border border-slate-800 focus:border-orange-500 rounded-xl pr-9 pl-4 py-2 outline-none transition"
            />
          </form>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold">
          <Link href="/" className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition">
            الرئيسية
          </Link>
          <Link href="/anime" className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-orange-500" /> الأنمي
          </Link>
          <Link href="/movies" className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-blue-500" /> الأفلام
          </Link>
          <Link href="/tv" className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-purple-500" /> المسلسلات
          </Link>
          <Link href="/categories" className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1">
            <Grid className="w-3.5 h-3.5 text-emerald-500" /> التصنيفات
          </Link>
          <Link href="/watchlist" className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500" /> المفضلة
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أنمي أو فيلم..."
              className="w-full bg-slate-900/90 text-sm text-white placeholder-slate-400 border border-slate-800 focus:border-orange-500 rounded-xl pr-9 pl-4 py-2 outline-none transition"
            />
          </form>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-slate-900 text-slate-200">
              الرئيسية
            </Link>
            <Link href="/anime" onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-slate-900 text-slate-200">
              الأنمي
            </Link>
            <Link href="/movies" onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-slate-900 text-slate-200">
              الأفلام
            </Link>
            <Link href="/tv" onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-slate-900 text-slate-200">
              المسلسلات
            </Link>
            <Link href="/categories" onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-slate-900 text-slate-200">
              التصنيفات
            </Link>
            <Link href="/watchlist" onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl bg-slate-900 text-slate-200">
              المفضلة
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
