import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const API_SCOPE = [
  "https://www.googleapis.com/auth/admob.readonly",
  "https://www.googleapis.com/auth/admob.report",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const apiUrl = process.env.NEXT_PUBLIC_API_BACKEND_URL;

const authOptions: NextAuthOptions = {
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
        token.refreshToken = account.refresh_token;

        // Gửi token về server backend
        try {
          await saveTokenToBackend(account, profile);
        } catch (error) {
          console.error("Gửi token thất bại:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: ".limgrow.com",
      },
    },
  },
};

const handler = NextAuth(authOptions);


async function saveTokenToBackend(account: any, profile: any) {
  try {
    await axios.post(
      `${apiUrl}/tokens/save-token`,
      {
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  } catch (error: any) {
    throw new Error("Gửi token thất bại: " + error?.message || error);
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }

  interface Profile {
    picture?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

export { handler as GET, handler as POST };
