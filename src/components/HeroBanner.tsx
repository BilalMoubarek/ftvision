'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Star, Info, Sparkles } from 'lucide-react';

export default function HeroBanner({ defaultItem }: { defaultItem: any }) {
  const [heroData, setHeroData] = useState<any>(defaultItem);

  useEffect(() => {
    // قراءة العمل المميز المحدد من لوحة الأدمن (إن وجد)
    const customHeroId = localStorage.getItem('ftvision_hero_id');
    const customHeroType = localStorage.getItem('ftvision_hero_type') || 'tv';

    if (customHeroId && customHeroId !== defaultItem?.id?.toString()) {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
      fetch(`https://api.themoviedb.org/3/${customHeroType}/${customHeroId}?api_key=${apiKey}&language=ar-SA`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            setHeroData({ ...data, media_type: customHeroType });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [defaultItem]);

  if (!heroData) return null;

  const title = heroData.title || heroData.name;
  const overview = heroData.overview || 'استمتع بمشاهدة أحدث الحلقات والأفلام بجودة عالية وسيرفرات فائقة السرعة.';
  const backdropUrl = heroData.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroData.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=FTVision+Stream';
  const type = heroData.media_type || (heroData.first_air_date ? 'tv' : 'movie');

  return (
    <div className="relative w-full h-[480px] md:h-[540px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl my-4">
      {/* خلفية البانر */}
      <img
        src={backdropUrl}
        alt={title}
        className="w-full h-full object-cover object-center scale-105"
      />

      {/* التدرج المظلم فوق الصورة */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

      {/* محتوى البانر */}
      <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-red-600/40">
            <Sparkles className="w-3 h-3" /> مميز اليوم
          </span>
          {heroData.vote_average > 0 && (
            <span className="bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {heroData.vote_average.toFixed(1)}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
          {title}
        </h1>

        <p className="text-xs md:text-sm text-slate-300 line-clamp-3 leading-relaxed max-w-xl">
          {overview}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href={`/watch/${type}/${heroData.id}`}
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-sm px-6 py-3 rounded-2xl transition flex items-center gap-2 shadow-xl shadow-red-600/30 hover:scale-105"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>مشاهدة الآن</span>
          </Link>

          <Link
            href={`/watch/${type}/${heroData.id}`}
            className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-xs md:text-sm px-5 py-3 rounded-2xl transition flex items-center gap-2 backdrop-blur-md"
          >
            <Info className="w-4 h-4 text-slate-400" />
            <span>التفاصيل</span>
          </Link>
        </div>
      </div>
    </div>
  );
}