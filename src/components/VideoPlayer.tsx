"use client";

import { useState } from "react";
import { Server, AlertTriangle, CheckCircle2 } from "lucide-react";
import { MESSAGES_STORAGE_KEY, VisitorMessage, getStoredVisitorMessages } from "@/components/AdminContactButton";

interface VideoPlayerProps {
  id: string;
  type: "movie" | "tv";
  title?: string;
  season?: number;
  episode?: number;
}

export default function VideoPlayer({ id, type, title = "العمل الحالي", season = 1, episode = 1 }: VideoPlayerProps) {
  const [selectedServer, setSelectedServer] = useState<number>(1);
  const [reported, setReported] = useState<boolean>(false);

  const getServerUrl = (srv: number) => {
    if (type === "movie") {
      switch (srv) {
        case 1:
          return `https://vidsrc.cc/v2/embed/movie/${id}`;
        case 2:
          return `https://vidlink.pro/movie/${id}`;
        case 3:
          return `https://autoembed.cc/embed/movie/${id}`;
        case 4:
          return `https://vidsrc.me/embed/movie?tmdb=${id}`;
        default:
          return `https://vidsrc.cc/v2/embed/movie/${id}`;
      }
    } else {
      switch (srv) {
        case 1:
          return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`;
        case 2:
          return `https://vidlink.pro/tv/${id}/${season}/${episode}`;
        case 3:
          return `https://autoembed.cc/embed/tv/${id}/${season}/${episode}`;
        case 4:
          return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
        default:
          return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`;
      }
    }
  };

  const handleReport = () => {
    const reportMsg: VisitorMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      topic: "إبلاغ عن سيرفر متعطل",
      message: `السيرفر رقم ${selectedServer} يتضمن مشكلة فـ تشغيل: ${title} (TMDB ID: ${id})`,
      page: typeof window !== "undefined" ? window.location.pathname : "/",
      createdAt: new Date().toLocaleString("ar-MA"),
      read: false,
    };

    const existing = getStoredVisitorMessages();
    const updated = [reportMsg, ...existing];
    window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("ftvision-messages-updated"));

    setReported(true);
    setTimeout(() => setReported(false), 3000);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
        <iframe
          src={getServerUrl(selectedServer)}
          className="h-full w-full border-0"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          title="FTVision Player"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300 pl-2">
            <Server className="h-4 w-4 text-orange-500" /> اختار السيرفر:
          </span>
          {[
            { id: 1, name: "سيرفر 1 (Super Fast)" },
            { id: 2, name: "سيرفر 2 (VidLink Pro)" },
            { id: 3, name: "سيرفر 3 (AutoEmbed)" },
            { id: 4, name: "سيرفر 4 (VidSrc Reserve)" },
          ].map((srv) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => setSelectedServer(srv.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedServer === srv.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {srv.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleReport}
          disabled={reported}
          className="flex items-center gap-1.5 rounded-xl bg-red-950/60 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-900/50 transition"
        >
          {reported ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">تم التبليغ بنجاح</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>إبلاغ عن توقف السيرفر</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
