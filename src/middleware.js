import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (e) {
        return null;
    }
}

export const middleware = async (request) => {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/registration', '/admin/login'].includes(path);

    const authorizationToken = request.cookies.get(process.env.COOKIE_KEY)?.value || '';
    const { userId, adminId } = await verifyToken(authorizationToken) || "";

    if (!isPublicPath && !adminId && !userId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl).toString());
    }

    if (isPublicPath && userId && !adminId) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl).toString());
    }

    if (isPublicPath && !userId && adminId) {
        return NextResponse.redirect(new URL('/admin', request.nextUrl).toString());
    }

    if (path.includes("/admin") && userId && !adminId) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl).toString());
    }
    if (path.includes("/profile") && !userId && adminId) {
        return NextResponse.redirect(new URL('/admin', request.nextUrl).toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile',
        '/login',
        '/registration',
        '/admin/:path*'
    ]
}
