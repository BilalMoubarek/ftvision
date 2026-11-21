import './globals.css';
import Navbar from '@/components/Navbar';
import NoticeBar from '@/components/NoticeBar';
import FaviconController from '@/components/FaviconController';
import AdminContactButton from '@/components/AdminContactButton';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'FTVision - مشاهدة الأفلام والأنمي أونلاين',
  description: 'منصة FTVision لمشاهدة أحدث الأنميات والأفلام بجودة عالية وسيرفرات سريعة.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <FaviconController />
        <NoticeBar />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <AdminContactButton />
        <footer className="bg-slate-900 border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
          <p>© 2026 FTVision. جميع الحقوق محفوظة.</p>
        </footer>
      </body>
    </html>
  );
}
