// import { NextRequest, NextResponse } from "next/server";

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  const protectedRoutes = ["/chat", "/chat-history"];
  const authRoutes = ["/signin"];

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  if (!token) {
    // If user is NOT logged in and trying to access protected routes -> Redirect to /signin
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify token
    // jwt.verify(token, process.env.JWT_SECRET as string);

    // If logged-in user tries to access /signin -> Redirect to /chat
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/chat", request.url));
    }

    return NextResponse.next();
  } catch {
    // Invalid token -> Redirect to /signin and remove cookie
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("token"); // Remove invalid token
    return response;
  }
}

export const config = {
    matcher: ["/chat", "/chat/:path*", "/chat-history", "/signin"],
  };