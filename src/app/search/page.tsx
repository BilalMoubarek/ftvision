import { tmdb } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? await tmdb.search(query) : [];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <Search className="w-6 h-6 text-red-500" />
        <h1 className="text-2xl font-black text-white">
          نتائج البحث عن: <span className="text-red-500">"{query}"</span>
        </h1>
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center text-slate-500 space-y-2">
          <p className="text-sm">لم نتمكن من العثور على أي نتائج تتطابق مع بحثك.</p>
          <p className="text-xs text-slate-600">تأكد من كتابة اسم العمل بشكل صحيح أو جرب البحث بالإنجليزية.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((item: any) => (
            <MovieCard key={item.id} item={item} type={item.media_type || 'movie'} />
          ))}
        </div>
      )}
    </div>
  );
}