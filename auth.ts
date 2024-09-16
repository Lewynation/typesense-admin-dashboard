import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PASSWORD_HASH, EMAIL } from "@/envs";
import * as bcrypt from "bcrypt";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (credentials == null) return null;
          const { email, password } = credentials;
          if (email == null || password == null || email !== EMAIL) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(
            password as string,
            PASSWORD_HASH!
          );
          console.log("🗝️🗝️Password validity: ", isPasswordValid);
          if (!isPasswordValid) {
            return null;
          }
          return { email: EMAIL, name: "Admin" };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
});
