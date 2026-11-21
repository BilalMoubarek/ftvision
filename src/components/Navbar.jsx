'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Search, Film, Tv, Sparkles, Clapperboard, Bookmark } from 'lucide-react';

const GENRES = [
  { id: 28, name: 'أكشن' },
  { id: 35, name: 'كوميديا' },
  { id: 27, name: 'رعب' },
  { id: 10749, name: 'رومانسية' },
  { id: 878, name: 'خيال علمي' },
];

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Dynamic Logo FTVision */}
        <Logo />

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-red-500 transition">
            الرئيسية
          </Link>
          <Link href="/anime" className="hover:text-red-500 transition flex items-center gap-1 text-red-400 font-bold">
            <Sparkles className="w-4 h-4" /> الأنمي
          </Link>
          <Link href="/movies" className="hover:text-red-500 transition flex items-center gap-1">
            <Film className="w-4 h-4" /> الأفلام
          </Link>
          <Link href="/series" className="hover:text-red-500 transition flex items-center gap-1">
            <Tv className="w-4 h-4" /> المسلسلات
          </Link>

          {/* Genres Dropdown */}
          <div className="relative group cursor-pointer py-2">
            <span className="hover:text-red-500 transition flex items-center gap-1 text-slate-400">
              <Clapperboard className="w-4 h-4" /> التصنيفات
            </span>
            <div className="absolute top-full right-0 hidden group-hover:flex flex-col bg-slate-900 border border-slate-800 rounded-2xl p-2 w-40 shadow-2xl space-y-1">
              {GENRES.map((g) => (
                <Link
                  key={g.id}
                  href={`/genre/${g.id}?name=${encodeURIComponent(g.name)}`}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-red-600 hover:text-white transition"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/watchlist" className="hover:text-red-500 transition flex items-center gap-1 text-slate-400">
            <Bookmark className="w-4 h-4" /> المفضلة
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="ابحث عن أنمي أو فيلم..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pr-10 pl-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
        </form>

      </div>
    </header>
  );
}