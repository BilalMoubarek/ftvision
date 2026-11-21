'use client';

import { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';

export default function NoticeBar() {
  const [notice, setNotice] = useState('');
  const [color, setColor] = useState('red');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const savedNotice = localStorage.getItem('ftvision_notice');
    const savedColor = localStorage.getItem('ftvision_notice_color');

    if (savedNotice) setNotice(savedNotice);
    else setNotice('مرحباً بكم في FTVision! أحدث الأنميات والأفلام مترجمة بجودة عالية.');

    if (savedColor) setColor(savedColor);
  }, []);

  if (!notice || !visible) return null;

  const colorStyles = {
    red: 'from-red-700 via-red-600 to-amber-600',
    amber: 'from-amber-600 via-amber-500 to-yellow-600 text-slate-950',
    slate: 'from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700',
  }[color] || 'from-red-700 via-red-600 to-amber-600';

  return (
    <div className={`bg-gradient-to-r ${colorStyles} text-white text-xs font-bold py-2.5 px-4 flex items-center justify-between shadow-md`}>
      <div className="max-w-7xl mx-auto flex items-center gap-2 justify-center flex-1 text-center">
        <Megaphone className="w-4 h-4 animate-bounce shrink-0" />
        <span>{notice}</span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="p-1 hover:bg-black/20 rounded-lg transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}