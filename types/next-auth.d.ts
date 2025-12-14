import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string;
    supabaseAccessToken?: string;
    user: DefaultSession["user"];
  }
}
