import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { StrapiErrorT } from "@/types/strapi/StrapiError";
import { StrapiLoginResponseT } from "@/types/strapi/User";

export const authOptions: AuthOptions = {
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "email and password",
      credentials: {
        identifier: {
          label: "Email or username *",
          type: "text",
        },
        password: { label: "Password *", type: "password" },
      },
      async authorize(credentials) {
        // make sure the are credentials
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null;
        }
        try {
          const strapiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                identifier: credentials!.identifier,
                password: credentials!.password,
              }),
            }
          );

          if (!strapiResponse.ok) {
            // return error to signIn callback
            const contentType = strapiResponse.headers.get("content-type");
            if (contentType === "application/json; charset=utf-8") {
              const data: StrapiErrorT = await strapiResponse.json();
              throw new Error(data.error.message);
            } else {
              throw new Error(strapiResponse.statusText);
            }
          }

          // success
          const data: StrapiLoginResponseT = await strapiResponse.json();
          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(),
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
          };
        } catch (error) {
          // Catch errors in try but also f.e. connection fails
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session storage (or "database" if using DB)
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // Ensures that the cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax", // Helps to mitigate CSRF attacks
        path: "/", // Cookie will be sent for all paths
      },
    },
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // account and user are optional, so we check if they exist
      if (account) {
        if (account.provider === "google") {
          try {
            const strapiResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?access_token=${account.access_token}`,
              { cache: "no-cache" }
            );
            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json();
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse: StrapiLoginResponseT =
              await strapiResponse.json();
            // Customize token
            token.strapiToken = strapiLoginResponse.jwt;
            token.provider = account.provider;
            token.strapiUserId = strapiLoginResponse.user.id;
            token.blocked = strapiLoginResponse.user.blocked;
          } catch (error) {
            throw error;
          }
        }
        if (account.provider === "credentials") {
          // for credentials, not google provider
          // name and email are taken care of by next-auth or authorize
          token.strapiToken = user.strapiToken;
          token.strapiUserId = user.strapiUserId;
          token.provider = account.provider;
          token.blocked = user.blocked;
        }
      }
      return token;
    },
    async session({ token, session }) {
      // Assign custom session properties based on the token
      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export const POST = handler;
export const GET = handler;
