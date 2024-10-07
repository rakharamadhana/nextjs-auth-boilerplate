import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import type {Metadata, Viewport} from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    viewportFit: 'cover',
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }]
}

export const metadata = {
    title: "NextJS Boilerplate",
    description: "NextJS, NextAuth, Prisma with Supabase PostgreSQL boilerplate",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
    authors: [
        { name: "Rakha Ramadhana" },
        {
            name: "Rakha Ramadhana",
            url: "linkedin.com/in/rakha-ramadhana",
        },
    ],
    icons: [
        { rel: "apple-touch-icon", url: "icons/icon512_rounded.png" },
        { rel: "icon", url: "icons/icon512_rounded.png" },
    ],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
        <body className={inter.className}>
        <Provider>
            <div className="min-h-screen flex flex-col">
                {/* Navbar at the top */}
                <Navbar/>

                {/* Main content that grows and takes available space */}
                <main className="flex-grow flex flex-col justify-center items-center">
                    {children}
                </main>

                {/* Footer at the bottom */}
                <Footer/>
            </div>
            <Toaster/>
        </Provider>
        </body>
        </html>
    );
}
