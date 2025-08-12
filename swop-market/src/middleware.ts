import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

const protectedRoutes = [
  "/account",
  "/admin",
  "/become-seller",
  "/cart",
  "/checkout",
  "/favourites",
  "/market",
  "/sell",
];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  if (session && isProtectedRoute && path === "/login") {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/become-seller/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/favourites/:path*",
    "/market/:path*",
    "/sell/:path*",
  ],
};
