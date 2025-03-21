/* eslint-disable */
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  
  const supabase = createMiddlewareClient({ req, res });
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session?.user) {
      const url = new URL('/login', req.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  } catch (err) {
    const url = new URL('/login', req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

// 重要: この設定により、ミドルウェアが適用されるパスを制限します
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*']
};