// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Chỉ bảo vệ các route `/dashboard`
export default withAuth(
  function middleware(req) {
    // Nếu cần xử lý thêm logic bên trong
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Nếu có token (user đã đăng nhập) thì cho qua
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
