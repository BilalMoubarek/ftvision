import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // حماية مسارات الأدمن فـ السيرفر
  if (pathname.startsWith('/admin')) {
    // كيتسمح للمتصفح بالوصول ولكن القيود المحلية فـ Client والـ Local Storage كتكمل الحماية
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
