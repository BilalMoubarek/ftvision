import Link from 'next/link';
import { Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 bg-red-600/10 border border-red-500/20 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
        <Film className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-300">الصفحة أو العمل غير موجود</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          عذراً، يبدو أن الفيلم أو الأنمي الذي تبحث عنه غير متوفر حالياً أو تم تغيير الرابط.
        </p>
      </div>
      <Link
        href="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-red-600/30"
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}