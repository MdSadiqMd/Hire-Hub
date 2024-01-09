import { NextResponse } from "next";
import type { NextRequest } from "next";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/signup", "/verifyemail"];
  const isPublicPath = publicPaths.includes(path);
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", ...publicPaths],
};
