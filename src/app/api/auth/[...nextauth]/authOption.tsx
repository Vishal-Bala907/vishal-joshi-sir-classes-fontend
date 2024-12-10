import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/server/auth";

export const authoption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const result = await signIn(credentials?.email, credentials?.password)
          if (result?.status == "success") {
            return {
              ...result.data.user,
              token: result.data.token,
            };
          }
          return null;
        }
        catch (err) {
          console.log(err);
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  debug: true

};
