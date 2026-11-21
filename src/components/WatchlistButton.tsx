'use client';
import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

export default function WatchlistButton({ item }: { item: any }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('ftvision_watchlist') || '[]');
    setIsSaved(list.some((i: any) => i.id === item.id));
  }, [item.id]);

  const toggleSave = () => {
    let list = JSON.parse(localStorage.getItem('ftvision_watchlist') || '[]');
    if (isSaved) {
      list = list.filter((i: any) => i.id !== item.id);
      setIsSaved(false);
    } else {
      list.push(item);
      setIsSaved(true);
    }
    localStorage.setItem('ftvision_watchlist', JSON.stringify(list));
  };

  return (
    <button
      onClick={toggleSave}
      className={`p-2 rounded-xl border transition flex items-center gap-2 text-xs font-bold ${
        isSaved
          ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
      }`}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      <span>{isSaved ? 'محفوظ فـ المفضلة' : 'حفظ فـ المفضلة'}</span>
    </button>
  );
}