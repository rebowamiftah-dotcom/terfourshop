import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  if (!token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  };

  const role = token.role;

  // Role: ADMIN

  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return new NextResponse("Not Found", {
        status: 404
      });
    };
  };

  // Role: SELLER

  if (pathname.startsWith("/seller")) {
    if (role !== "SELLER") {
      return new NextResponse("Not Found", {
        status: 404
      });
    };
  };

  // CUSTOMER

  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders")
  ) {
    if (role !== "CUSTOMER") {
      return new NextResponse("Not Found", {
        status: 404
      });
    };
  };

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/seller/:path*",
    "/member/:path*",
  ],
};