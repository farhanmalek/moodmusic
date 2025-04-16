import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest)  {
    const token = request.cookies.get("access_token")?.value;
    const protectedRoutes = [
        "/search",
    ];
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();

}