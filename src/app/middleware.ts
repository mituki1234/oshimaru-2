import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 保護するルートを指定（複数のルートを追加可能）
const protectedRoutes = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // 保護されたルートの場合のみ認証チェックを行う
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();
    
    // セッションがない場合はログインページにリダイレクト
    if (!session) {
      const url = new URL('/login', req.url);
      // 現在のURLをリダイレクト後にリダイレクトするためのクエリパラメータとして追加
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return res;
}
