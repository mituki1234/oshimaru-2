import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  console.log(`[Middleware] 明示的に呼び出されました: ${pathname}`);
  
  const supabase = createMiddlewareClient({ req, res });
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log(`[Middleware] セッションチェック:`, { 
      パス: pathname,
      セッションあり: !!session, 
      ユーザーあり: !!session?.user,
      エラー: error?.message 
    });

    if (!session?.user) {
      console.log(`[Middleware] 有効なセッションなし、ログインへリダイレクト`);
      const url = new URL('/login', req.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    
    console.log(`[Middleware] 有効なセッションを確認、アクセス許可`);
  } catch (err) {
    console.error(`[Middleware] セッション確認エラー:`, err);
    const url = new URL('/login', req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

// 重要: この設定により、ミドルウェアが適用されるパスを制限します
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*']
};