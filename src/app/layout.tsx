import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: "NextJS Boilerplate",
    description: "NextJS, NextAuth, Prisma with Supabase PostgreSQL boilerplate",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
    authors: [
        { name: "Rakha Ramadhana" },
        {
            name: "Rakha Ramadhana",
            url: "linkedin.com/in/rakha-ramadhana",
        },
    ],
    viewport:
        "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
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
          <main className='h-screen flex flex-col justify-center items-center'>
              <Navbar/>
              {children}
          </main>
          <Toaster/>
      </Provider>
      </body>
      </html>
  );
}
