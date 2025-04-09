import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const memberType = req.cookies.get('auth')?.value;

  const safePaths = ['/', '/login'];

  if (safePaths.includes(path)) {
    return NextResponse.next();
  }

  if (memberType === 'member' && path.startsWith('/mypage')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    (memberType === 'trainer' || memberType === 'owner') &&
    path.startsWith('/membermypage')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/membermypage/:path*'], // 보호하고 싶은 경로만
};
