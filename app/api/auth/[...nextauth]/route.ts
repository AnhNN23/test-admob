// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

// Các scope cần thiết để truy cập AdMob API + thông tin user
const API_SCOPE = [
  "https://www.googleapis.com/auth/admob.readonly",
  "https://www.googleapis.com/auth/admob.report",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: API_SCOPE.join(" "),
          access_type: "offline", // Lấy refresh_token
          prompt: "consent", // Yêu cầu user đồng ý mỗi lần
        },
      },
    }),
  ],

  callbacks: {
    // Gọi mỗi lần có token mới được tạo hoặc refresh
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Gán access_token và refresh_token vào token
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? token.refreshToken;

        // Gửi token lên backend để lưu
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL!;
          await fetch(`${apiUrl}/tokens/save-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              name: profile.name,
              email: profile.email,
              picture: profile.picture,
            }),
          });
        } catch (error) {
          console.error("Gửi token thất bại:", error);
        }
      }
      return token;
    },

    // Gọi mỗi khi frontend gọi useSession()
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Mở rộng type cho Session và JWT
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
