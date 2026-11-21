'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle, Sparkles } from 'lucide-react';

export default function Logo() {
  const [siteName, setSiteName] = useState('FTVISION');
  const [logoIcon, setLogoIcon] = useState('play');

  useEffect(() => {
    const savedName = localStorage.getItem('ftvision_site_name');
    if (savedName) setSiteName(savedName);
  }, []);

  // Smyt l-site tytqsm l-joj hwayj: l-Hrof l-wlanin w-l-baqi
  const mainText = siteName.slice(0, 2);
  const subText = siteName.slice(2);

  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      {/* Icon Emblem m3a Glowing Gradient Effect */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-700 via-red-600 to-amber-500 shadow-lg shadow-red-600/30 group-hover:scale-105 group-hover:shadow-red-600/50 transition duration-300">
        <PlayCircle className="w-6 h-6 text-white fill-white/20 group-hover:rotate-12 transition duration-300" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      </div>

      {/* Dynamic Text Branding */}
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-black tracking-wider text-white leading-none">
          {mainText}<span className="text-red-500">{subText}</span>
        </span>
        <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-400 inline" /> Stream Hub
        </span>
      </div>
    </Link>
  );
}