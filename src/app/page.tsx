import { tmdb } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import HeroBanner from '@/components/HeroBanner';
import ContinueWatching from '@/components/ContinueWatching';
import { Flame, Sparkles, Film } from 'lucide-react';

export default async function Home() {
  const trending = await tmdb.getTrending('all');
  const anime = await tmdb.getAnime();
  const movies = await tmdb.getMovies();

  const heroDefault = trending[0] || anime[0];

  return (
    <div className="space-y-10 pb-12">
      <HeroBanner defaultItem={heroDefault} />

      {/* قسم متابعة المشاهدة الخاص بالمستخدم */}
      <ContinueWatching />

      {/* قسم الترند */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <Flame className="w-6 h-6 text-red-500 animate-pulse" />
          <h2 className="text-xl font-black text-white">الأعمال الأكثر ترند (Trending Now)</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.slice(0, 12).map((item: any) => (
            <MovieCard key={item.id} item={item} type={item.media_type || 'movie'} />
          ))}
        </div>
      </section>

      {/* قسم الأنمي */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <Sparkles className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-black text-white">جديد الأنميات (Anime Releases)</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {anime.slice(0, 12).map((item: any) => (
            <MovieCard key={item.id} item={item} type="tv" />
          ))}
        </div>
      </section>

      {/* قسم الأفلام */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <Film className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-black text-white">أفلام مختارة (Popular Movies)</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.slice(0, 12).map((item: any) => (
            <MovieCard key={item.id} item={item} type="movie" />
          ))}
        </div>
      </section>
    </div>
  );
}