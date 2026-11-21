'use client';
import { useState } from 'react';
import { Server } from 'lucide-react';

export default function VideoPlayer({ id, type = 'movie', season = 1, episode = 1 }) {
  const [server, setServer] = useState(1);

  const getEmbedUrl = () => {
    if (type === 'movie') {
      if (server === 1) return `https://vidsrc.to/embed/movie/${id}`;
      if (server === 2) return `https://vidsrc.me/embed/movie?tmdb=${id}`;
      return `https://2embed.cc/embed/${id}`;
    } else {
      if (server === 1) return `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
      if (server === 2) return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      return `https://2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        <iframe
          src={getEmbedUrl()}
          className="w-full h-full border-0"
          allowFullScreen
          scrolling="no"
        />
      </div>

      {/* Server Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Server className="w-4 h-4 text-red-500" />
          <span>سيرفر المشاهدة:</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setServer(s)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                server === s
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              سيرفر {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}