import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) return NextResponse.redirect(new URL("/", request.url));
  NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
