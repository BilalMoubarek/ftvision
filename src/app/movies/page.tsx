import { tmdb } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { Film } from 'lucide-react';

export default async function MoviesPage() {
  const moviesList = await tmdb.getMovies();

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <Film className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-black text-white">مكتبة الأفلام (Movies Hub)</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {moviesList.map((item: any) => (
          <MovieCard key={item.id} item={item} type="movie" />
        ))}
      </div>
    </div>
  );
}