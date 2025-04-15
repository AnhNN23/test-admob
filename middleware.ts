import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    
    if (req.nextauth.token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!req.nextauth.token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true 
    }
  }
);

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
