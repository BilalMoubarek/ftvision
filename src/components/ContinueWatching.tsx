'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle, Clock, X } from 'lucide-react';

export default function ContinueWatching() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ftvision_history') || '[]');
    setHistory(saved.slice(0, 4));
  }, []);

  const removeItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem('ftvision_history', JSON.stringify(updated));
  };

  if (history.length === 0) return null;

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <Clock className="w-5 h-5 text-red-500" />
        <h2 className="text-lg font-black text-white">متابعة المشاهدة (Continue Watching)</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3 relative group hover:border-red-500/40 transition"
          >
            <img
              src={item.poster ? `https://image.tmdb.org/t/p/w185${item.poster}` : 'https://via.placeholder.com/185'}
              alt={item.title}
              className="w-14 h-20 object-cover rounded-xl border border-slate-800"
            />

            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-bold text-white truncate max-w-[140px]">{item.title}</h4>
              {item.type === 'tv' && (
                <span className="text-[10px] text-red-400 bg-red-600/10 px-2 py-0.5 rounded font-bold inline-block">
                  الموسم {item.season} - الحلقة {item.episode}
                </span>
              )}
              
              <Link
                href={`/watch/${item.type}/${item.id}`}
                className="mt-2 text-[11px] bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-lg transition inline-flex items-center gap-1 shadow-md shadow-red-600/20"
              >
                <PlayCircle className="w-3.5 h-3.5" /> استكمال
              </Link>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-2 left-2 text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}