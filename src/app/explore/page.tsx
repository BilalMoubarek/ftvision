import { tmdb } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { Compass } from 'lucide-react';

interface ExploreProps {
  searchParams: Promise<{ type?: string; sort?: string }>;
}

export default async function ExplorePage({ searchParams }: ExploreProps) {
  const { type = 'movie', sort = 'popularity.desc' } = await searchParams;

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&sort_by=${sort}&language=ar-SA`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const list = data.results || [];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-black text-white">المكتشف المتقدم (Explore Hub)</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.map((item: any) => (
          <MovieCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </div>
  );
}