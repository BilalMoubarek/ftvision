'use client';

import { useState, useEffect } from 'react';
import { Server, Tv, Play, FastForward } from 'lucide-react';

interface WatchSectionProps {
  id: string;
  type: string;
  seasons?: any[];
}

export default function WatchSection({ id, type, seasons }: WatchSectionProps) {
  const [server, setServer] = useState(1);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  // Qra l-Default Server lli khtarti f-Admin Panel
  useEffect(() => {
    const savedServer = localStorage.getItem('ftvision_default_server');
    if (savedServer) {
      setServer(Number(savedServer));
    }
  }, []);

  useEffect(() => {
    setSeason(1);
    setEpisode(1);
  }, [id]);

  const validSeasons = seasons?.filter((s) => s.season_number > 0 && s.episode_count > 0) || [];
  const currentSeasonData = validSeasons.find((s) => s.season_number === Number(season)) || validSeasons[0];
  const episodeCount = currentSeasonData?.episode_count || 1;

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('ftvision_history') || '[]');
    const existingIndex = savedHistory.findIndex((i: any) => i.id === id);
    const newEntry = { id, type, season, episode, timestamp: Date.now() };

    if (existingIndex > -1) {
      savedHistory[existingIndex] = { ...savedHistory[existingIndex], ...newEntry };
    } else {
      savedHistory.unshift(newEntry);
    }
    localStorage.setItem('ftvision_history', JSON.stringify(savedHistory.slice(0, 10)));
  }, [id, season, episode, type]);

  // Dynamic Embed Logic m3a Serveurs stable بلا Bot Check
  const getEmbedUrl = () => {
    if (type === 'movie') {
      if (server === 1) return `https://embed.su/embed/movie/${id}`;
      if (server === 2) return `https://vidsrc.me/embed/movie?tmdb=${id}`;
      if (server === 3) return `https://2embed.cc/embed/${id}`;
      return `https://vidsrc.to/embed/movie/${id}`;
    } else {
      if (server === 1) return `https://embed.su/embed/tv/${id}/${season}/${episode}`;
      if (server === 2) return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      if (server === 3) return `https://2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
      return `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
    }
  };

  const handleNextEpisode = () => {
    if (episode < episodeCount) {
      setEpisode((prev) => prev + 1);
    } else {
      const currentIndex = validSeasons.findIndex((s) => s.season_number === Number(season));
      if (currentIndex !== -1 && currentIndex < validSeasons.length - 1) {
        const nextSeasonNum = validSeasons[currentIndex + 1].season_number;
        setSeason(nextSeasonNum);
        setEpisode(1);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Player Frame */}
      <div className="relative aspect-video w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <iframe
          key={`${id}-${server}-${season}-${episode}`}
          src={getEmbedUrl()}
          className="w-full h-full border-0"
          allowFullScreen
          scrolling="no"
        />
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
          <Server className="w-4 h-4 text-red-500" />
          <span>سيرفرات المشاهدة:</span>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 1, name: 'سيرفر 1 (EmbedSu Fast)' },
            { id: 2, name: 'سيرفر 2 (VidSrc v2)' },
            { id: 3, name: 'سيرفر 3 (2Embed)' },
            { id: 4, name: 'سيرفر 4 (VidSrc)' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setServer(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                server === s.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.name}
            </button>
          ))}

          {type === 'tv' && (
            <button
              onClick={handleNextEpisode}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 mr-2"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>الحلقة التالية</span>
            </button>
          )}
        </div>
      </div>

      {/* Episodes Selector */}
      {type === 'tv' && (
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Tv className="w-4 h-4 text-red-500" /> قائمة الحلقات والمواسم
            </h3>

            {validSeasons.length > 0 && (
              <select
                value={season}
                onChange={(e) => {
                  setSeason(Number(e.target.value));
                  setEpisode(1);
                }}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-red-500 cursor-pointer"
              >
                {validSeasons.map((s) => (
                  <option key={s.id || s.season_number} value={s.season_number}>
                    {s.name || `الموسم ${s.season_number}`}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {Array.from({ length: episodeCount }, (_, i) => i + 1).map((ep) => (
              <button
                key={ep}
                onClick={() => setEpisode(ep)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                  episode === ep
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{ep}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}