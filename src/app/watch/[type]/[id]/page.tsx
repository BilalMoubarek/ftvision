import { tmdb } from '@/lib/tmdb';
import WatchSection from '@/components/WatchSection';
import WatchlistButton from '@/components/WatchlistButton';
import CommentsSection from '@/components/CommentsSection';
import RelatedSection from '@/components/RelatedSection';
import TrailerModal from '@/components/TrailerModal';
import ShareModal from '@/components/ShareModal';
import { Star, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

// توليد بطاقة المعاينة التلقائية للشبكات الاجتماعية (Social Sharing)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, id } = await params;
  const details = await tmdb.getDetails(type, id);

  if (!details) {
    return { title: 'FTVision - مشاهدة أونلاين' };
  }

  const title = details.title || details.name;
  const description = details.overview || 'شاهد الآن بجودة عالية على FTVision';
  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750';

  return {
    title: `${title} - مشاهدة أونلاين | FTVision`,
    description,
    openGraph: {
      title: `${title} | FTVision`,
      description,
      images: [{ url: posterUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | FTVision`,
      description,
      images: [posterUrl],
    },
  };
}

export default async function WatchPage({ params }: PageProps) {
  const { type, id } = await params;
  const details = await tmdb.getDetails(type, id);

  if (!details) {
    notFound();
  }

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* مشغل الفيديو والسيرفرات */}
      <WatchSection id={id} type={type} seasons={details.seasons} />

      {/* تفاصيل العمل وأزرار التحكم */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start shadow-xl">
        <img
          src={posterUrl}
          alt={title}
          className="w-48 md:w-56 rounded-2xl shadow-lg border border-slate-800 object-cover mx-auto md:mx-0"
        />

        <div className="space-y-4 flex-1 w-full">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-block">
                {type === 'tv' ? 'أنمي / مسلسل' : 'فيلم'}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-white">{title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <TrailerModal videos={details.videos?.results} />
              <ShareModal title={title} />
              <WatchlistButton item={{ id, type, title, poster_path: details.poster_path, vote_average: details.vote_average }} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1 text-amber-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{year}</span>
            </div>
            {details.runtime && (
              <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{details.runtime} دقيقة</span>
              </div>
            )}
          </div>

          {details.overview && (
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-200">القصة:</h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                {details.overview}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* قسم الأعمال المقترحة */}
      <RelatedSection id={id} type={type} />

      {/* قسم التعليقات والنقاشات */}
      <CommentsSection mediaId={id} />
    </div>
  );
}