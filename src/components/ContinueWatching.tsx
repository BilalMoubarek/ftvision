"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Clock, X } from "lucide-react";

export interface WatchHistoryItem {
  id: string;
  type: "movie" | "tv";
  title: string;
  poster?: string;
  season?: number;
  episode?: number;
  updatedAt: number;
}

const HISTORY_KEY = "ftvision_continue_watching_v1";

export function saveWatchHistory(item: Omit<WatchHistoryItem, "updatedAt">) {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const list: WatchHistoryItem[] = raw ? JSON.parse(raw) : [];
    const filtered = Array.isArray(list)
      ? list.filter((x) => !(String(x.id) === String(item.id) && x.type === item.type))
      : [];
    const next: WatchHistoryItem[] = [{ ...item, updatedAt: Date.now() }, ...filtered].slice(0, 12);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("ftvision-history-updated"));
  } catch {
    // تجاهل أخطاء التخزين
  }
}

export default function ContinueWatching() {
  const [items, setItems] = useState<WatchHistoryItem[]>([]);

  const loadHistory = () => {
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    loadHistory();
    window.addEventListener("ftvision-history-updated", loadHistory);
    window.addEventListener("storage", loadHistory);
    return () => {
      window.removeEventListener("ftvision-history-updated", loadHistory);
      window.removeEventListener("storage", loadHistory);
    };
  }, []);

  const removeItem = (e: React.MouseEvent, id: string, type: "movie" | "tv") => {
    e.preventDefault();
    e.stopPropagation();
    const updated = items.filter((x) => !(String(x.id) === String(id) && x.type === type));
    setItems(updated);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-black text-white">
          <Clock className="w-5 h-5 text-orange-500" />
          <span>متابعة المشاهدة</span>
        </h2>
        <span className="text-xs text-slate-400">{items.length} أعمال</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => {
          const href =
            item.type === "tv"
              ? `/watch/tv/${item.id}?season=${item.season || 1}&episode=${item.episode || 1}`
              : `/watch/movie/${item.id}`;

          return (
            <div
              key={`${item.type}-${item.id}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition"
            >
              <Link href={href} className="block">
                <div className="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden">
                  {item.poster ? (
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                      FTVision
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span className="w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current mr-0.5" />
                    </span>
                  </div>

                  {item.type === "tv" && (
                    <span className="absolute top-2 right-2 rounded-lg bg-slate-950/90 border border-slate-700/80 px-2 py-0.5 text-[11px] font-bold text-orange-400">
                      م{item.season || 1} • ح{item.episode || 1}
                    </span>
                  )}
                </div>

                <div className="p-2.5">
                  <p className="text-xs font-bold text-white truncate">{item.title}</p>
                </div>
              </Link>

              <button
                type="button"
                onClick={(e) => removeItem(e, item.id, item.type)}
                aria-label="إزالة من متابعة المشاهدة"
                className="absolute top-2 left-2 w-6 h-6 rounded-full bg-slate-950/80 text-slate-400 hover:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
