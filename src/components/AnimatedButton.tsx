// src/components/AnimatedButton.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { signOut, useSession } from "next-auth/react";

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
        <motion.a
            onClick={logOut ? handleClick : undefined} // Only attach onClick if logOut is true
            href={!logOut ? href : undefined} // Only use href if not logging out
            initial={{ scale: 1 }} // Initial scale
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on tap
            transition={{ duration: 0.2 }} // Animation duration
            className={`px-6 py-2 rounded-md ${className} ${href || logOut ? 'cursor-pointer' : ''}`} // Add cursor-pointer if href or logOut is present
        >
            {children} {/* Render button content */}
        </motion.a>
    );
};

export default AnimatedButton;
