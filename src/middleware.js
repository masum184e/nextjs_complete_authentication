import { NextResponse } from 'next/server'
import { getUserIdFromToken } from './helpers/getUserIdFromToken';
import { getAdminIdFromToken } from './helpers/getAdminIdFromToken';

export const middleware = (request) => {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/registration', '/admin/login'].includes(path);

    const userId = getUserIdFromToken(request) || '';
    const adminId = getAdminIdFromToken(request) || '';
    
    if (!isPublicPath && (!userId || !adminId)) {
        return NextResponse.redirect(new URL('/login', request.nextUrl).toString());
    }

    if (isPublicPath && userId && !adminId) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl).toString());
    }
    
    if (isPublicPath && !userId && adminId) {
        return NextResponse.redirect(new URL('/admin', request.nextUrl).toString());
    }

    return undefined;
}
export const config = {
    matcher: [
        '/profile',
        '/login',
        '/registration',
        '/admin/:path*'
    ]
}