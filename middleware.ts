import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const currentPath = request.nextUrl.pathname;

 
    if (currentPath === "/" && token) {
        return NextResponse.redirect(new URL("/search", request.url));
    }

    const protectedRoutes = ["/search"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        currentPath.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
