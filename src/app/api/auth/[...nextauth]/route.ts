import NextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma";



const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });


        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword ?? '');


        if (!passwordMatch) {
          return null;
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session }) {
      const account = await prisma.user.findUnique({
        where: {
          email: session.user.email
        },
        include: {
          links: true,
        }

      });
      session.user.id = account?.id;
      session.user.image = account?.image;
      session.user.name = account?.name;
      session.user.links = account?.links;

      return session; 
   
    },
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
});

export { handler as GET, handler as POST };
