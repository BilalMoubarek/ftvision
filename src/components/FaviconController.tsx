'use client';

import { useEffect } from 'react';

export default function FaviconController() {
  useEffect(() => {
    const savedFavicon = localStorage.getItem('ftvision_site_favicon');
    if (savedFavicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = savedFavicon;
    }
  }, []);

  return null;
}