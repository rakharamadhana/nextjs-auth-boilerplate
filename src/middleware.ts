import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Define the structure of your token
interface Token {
    role?: string; // Add other properties as necessary
}

// This function runs for every request
export async function middleware(req: NextRequest) {
    const token = (await getToken({ req })) as Token | null; // Cast token to the Token interface or null

    // If the user is accessing /admin
    if (req.nextUrl.pathname.startsWith("/profile")) {
        if (!token) {
            console.log("Access Denied: Redirecting to Error Page"); // Log access denial
            return NextResponse.redirect(new URL('/error', req.url)); // Redirect to an error page
        }
    }

    // If the user is accessing /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token || token.role !== "admin") {
            console.log("Access Denied: Redirecting to Error Page"); // Log access denial
            return NextResponse.redirect(new URL('/error', req.url)); // Redirect to an error page
        }
    }

    return NextResponse.next(); // Proceed to the requested route if authorized
}

export const config = {
    matcher: ['/admin/:path*', '/profile'],
};
