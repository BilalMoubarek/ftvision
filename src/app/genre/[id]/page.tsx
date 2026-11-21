import { tmdb } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { Sparkles } from 'lucide-react';

interface GenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const { id } = await params;
  const { name } = await searchParams;

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
  
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&sort_by=popularity.desc&language=ar-SA`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  const list = data.results || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <Sparkles className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-black text-white">
          تصنيف: <span className="text-red-500">{name || 'أعمال مختارة'}</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.map((item: any) => (
          <MovieCard key={item.id} item={item} type="movie" />
        ))}
      </div>
    </div>
  );
}