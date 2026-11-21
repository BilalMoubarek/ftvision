'use client';

import { useState } from 'react';
import { Share2, Check, Send } from 'lucide-react';

export default function ShareModal({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`شاهد الآن "${title}" على FTVision: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="p-2.5 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 rounded-xl transition flex items-center gap-2 text-xs font-bold hover:border-slate-700"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
        <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة'}</span>
      </button>

      <button
        onClick={shareWhatsApp}
        className="p-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition flex items-center gap-1 text-xs font-bold"
        title="مشاركة على WhatsApp"
      >
        <Send className="w-4 h-4" />
        <span className="hidden sm:inline">واتساب</span>
      </button>
    </div>
  );
}