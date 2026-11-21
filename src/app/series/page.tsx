import MovieCard from '@/components/MovieCard';
import { Tv } from 'lucide-react';

export default async function SeriesPage() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ar-SA`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const seriesList = data.results || [];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <Tv className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-black text-white">المسلسلات والعروض (TV Series)</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {seriesList.map((item: any) => (
          <MovieCard key={item.id} item={item} type="tv" />
        ))}
      </div>
    </div>
  );
}