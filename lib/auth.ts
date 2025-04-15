import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

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
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? token.refreshToken;

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
              picture: null,
            }),
          });
        } catch (error) {
          console.error("Gửi token thất bại:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
