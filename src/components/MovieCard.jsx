import Link from 'next/link';
import { Star, Play } from 'lucide-react';

export default function MovieCard({ item, type = 'movie' }) {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const mediaType = item.media_type || type;
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Link
      href={`/watch/${mediaType}/${item.id}`}
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30 flex flex-col"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Rating Badge */}
        {item.vote_average > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {item.vote_average.toFixed(1)}
          </div>
        )}

        {/* Play Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/40 scale-75 group-hover:scale-100 transition duration-300">
            <Play className="w-6 h-6 fill-white translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-1">
        <h3 className="font-bold text-sm text-slate-100 truncate group-hover:text-red-400 transition">
          {title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>{year}</span>
          <span className="uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50">
            {mediaType === 'tv' ? 'أنمي/مسلسل' : 'فيلم'}
          </span>
        </div>
      </div>
    </Link>
  );
}