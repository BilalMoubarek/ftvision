'use client';

import { useState } from 'react';
import { Play, X, Tv } from 'lucide-react';

export default function TrailerModal({ videos }: { videos?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // البحث عن التريلر الرسمي فـ يوتيوب من TMDB
  const trailer = videos?.find(
    (v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  if (!trailer) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 hover:border-red-500/40"
      >
        <Play className="w-4 h-4 text-red-500 fill-red-500" />
        <span>الإعلان التشويقي (Trailer)</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <h3 className="font-bold text-white text-xs flex items-center gap-2">
                <Tv className="w-4 h-4 text-red-500" /> الإعلان الرسمي للعمل
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="Trailer"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}