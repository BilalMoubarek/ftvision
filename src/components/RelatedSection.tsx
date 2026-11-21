'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { Sparkles } from 'lucide-react';

interface RelatedProps {
  id: string;
  type: string;
}

export default function RelatedSection({ id, type }: RelatedProps) {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '300114b116c2f9173cc2a6436f334808';
    fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=ar-SA`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setList(data.results.slice(0, 6));
        }
      })
      .catch((err) => console.error(err));
  }, [id, type]);

  if (list.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-800/80">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-black text-white">أعمال قد تعجبك (Recommendations)</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.map((item) => (
          <MovieCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </div>
  );
}