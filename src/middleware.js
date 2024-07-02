import { NextResponse } from 'next/server'

export const middleware = (request) => {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/registration'].includes(path);

    const authorizationToken = request.cookies.get(process.env.COOKIE_KEY)?.value || '';

    if (isPublicPath && authorizationToken) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl).toString());
    }
    if (!isPublicPath && !authorizationToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl).toString());
    }

    return undefined;
}
export const config = {
    matcher: [
        '/profile',
        '/login',
        '/registration',
    ]
}