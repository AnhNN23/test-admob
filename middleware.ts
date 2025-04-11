// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const url = request.nextUrl;

  // Nếu đã có token và đang ở trang login, thì redirect sang dashboard
  if (token && url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Nếu không có token mà vào dashboard, thì redirect về login
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'], // Áp dụng cho route login và dashboard
};
