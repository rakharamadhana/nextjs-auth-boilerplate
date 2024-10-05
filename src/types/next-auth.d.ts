import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client";
import { JWT as NextAuthJWT } from "next-auth/jwt";

// Extend the User type
declare module "next-auth" {
    interface User extends PrismaUser {
        username?: string | null; // Optional if not all users have usernames
        role?: string | null; // Add role to the user type
    }

    interface Session {
        user: User & {
            id: string | null; // Add id to the JWT type
            username?: string | null; // Optional username
            role?: string | null; // Add role to the session user type
        };
    }
}

// Extend the JWT type
declare module "next-auth/jwt" {
    interface JWT {
        id: string | null; // Add id to the JWT type
        username?: string | null;
        role?: string | null; // Ensure role is nullable or optional
    }
}
