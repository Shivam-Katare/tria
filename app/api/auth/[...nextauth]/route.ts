import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/gmail.send",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.modify",
          ].join(" "),
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  callbacks: {
    async signIn({ user, account }) {
      // Save refresh token to Kestra
      // if (account?.provider === "google" && account.refresh_token) {
      //   try {
      //     await saveRefreshTokenToKestra(user.id, account.refresh_token);
      //     console.log("✅ Refresh token saved to Kestra for user:", user.id);
      //   } catch (error) {
      //     console.error("❌ Failed to save to Kestra:", error);
      //     // Don't block sign-in if Kestra fails
      //   }
      // }
      return true;
    },

    async session({ session, user }) {
      // Add user ID to session
      session.userId = user.id;

      // Generate Supabase access token for RLS
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

// Helper: Save refresh token to Kestra
async function saveRefreshTokenToKestra(userId: string, refreshToken: string) {
  const namespace = `tria.user.${userId}`;
  const kestraUrl = process.env.KESTRA_API_URL || "http://localhost:8080";

  const response = await fetch(
    `${kestraUrl}/api/v1/namespaces/${namespace}/secrets`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secrets: {
          GMAIL_REFRESH_TOKEN: Buffer.from(refreshToken).toString("base64"),
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Kestra API error: ${errorText}`);
  }

  return response.json();
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
