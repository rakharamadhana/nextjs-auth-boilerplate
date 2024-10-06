import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@mail.com" },
                password: { label: "Password", type: "password" },
            },
            // @ts-ignore
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!existingUser) {
                    throw new Error("Invalid username or password.");
                }

                if (existingUser.password) {
                    const passwordMatch = await compare(credentials.password, existingUser.password);
                    if (!passwordMatch) {
                        throw new Error("Invalid username or password.");
                    }
                } else {
                    throw new Error("Invalid username or password");
                }

                return {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                    image: existingUser.image,
                    role: existingUser.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Assuming `user` contains the ID, name, email, and role from your database
                token.id = user.id; // Add user ID to token
                token.role = user.role; // Add role to token
            }
            return token;
        },
        async session({ session, token }) {
            // Add user ID and role to the session
            session.user.id = token.id ?? ""; // Provide a fallback, e.g., an empty string
            session.user.role = token.role;

            if (!token.id) {
                throw new Error("User ID is null or undefined");
            }

            // This might not be needed if you properly handle the state in your component
            const updatedUser = await db.user.findUnique({
                where: { id: Number(token.id) },
            });

            if (updatedUser) {
                session.user.name = updatedUser.name;
                session.user.email = updatedUser.email;
            }
            return session;
        },
    },
};
