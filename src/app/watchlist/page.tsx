'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { Bookmark } from 'lucide-react';

export default function WatchlistPage() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ftvision_watchlist') || '[]');
    setList(saved);
  }, []);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <Bookmark className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-black text-white">قائمة المفضلة (Watchlist)</h1>
      </div>

      {list.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          لم تقم بإضافة أي أنمي أو فيلم للمفضلة بعد.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {list.map((item) => (
            <MovieCard key={item.id} item={item} type={item.type || 'movie'} />
          ))}
        </div>
      )}
    </div>
  );
}