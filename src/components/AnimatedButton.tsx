// src/components/AnimatedButton.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link'; // Import Link from next/link

interface AnimatedButtonProps {
    children: React.ReactNode; // The content inside the button
    className?: string; // Optional className for additional styling
    href?: string; // The URL to navigate to
    logOut?: boolean; // Optional boolean to trigger sign out
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, href, logOut = false }) => {
    const { data: session } = useSession();

    const handleClick = async () => {
        if (logOut) {
            try {
                // Await the signOut promise
                await signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/sign-in`,
                });
            } catch (error) {
                console.error("Error during sign out:", error);
            }
        }
    };

    return (
        <motion.div // Wrap Link in a motion.div
            initial={{ scale: 1 }} // Initial scale
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on tap
            transition={{ duration: 0.2 }} // Animation duration
            className={`px-6 py-2 rounded-md ${className} ${href || logOut ? 'cursor-pointer' : ''}`} // Add cursor-pointer if href or logOut is present
        >
            {logOut ? (
                <button onClick={handleClick} className="w-full text-left"> {/* Use a button for log out */}
                    {children}
                </button>
            ) : (
                <Link href={href || '#'} className="block w-full"> {/* Use Link for navigation */}
                    {children}
                </Link>
            )}
        </motion.div>
    );
};

export default AnimatedButton;
