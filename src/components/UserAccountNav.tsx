"use client";

import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link"; // Import motion and useAnimation

interface UserAccountNavProps {
    mobile?: boolean; // Optional prop for mobile styling
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ mobile }) => {
    const { data: session, status } = useSession(); // Add status to check loading state
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown
    const controls = useAnimation(); // Animation controls
    const isAdmin = session?.user?.role === "admin"; // Check if the user is an admin

    const toggleDropdown = () => {
        if (!isDropdownOpen) {
            setDropdownOpen(true); // Open dropdown
            controls.start({ scale: 1, opacity: 1 }); // Start animation for opening
        } else {
            controls.start({ scale: 0, opacity: 0 }); // Start animation for closing
            setTimeout(() => setDropdownOpen(false), 300); // Close after animation
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                if (isDropdownOpen) {
                    controls.start({ scale: 0, opacity: 0 }); // Start closing animation
                    setTimeout(() => setDropdownOpen(false), 300); // Close after animation
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen, controls]);

    // Show loading skeleton if session is loading
    if (status === "loading") {
        return (
            <div className={`flex ${mobile ? 'flex-col items-stretch' : 'flex-row items-center gap-2 ml-auto p-2'}`}>
                {!mobile && (
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                )}
            </div>
        );
    }

    if (session && session.user) {
        return (
            <div className={`relative flex ${mobile ? 'flex-col items-stretch' : 'flex-row items-center gap-2 ml-auto'}`}>
                {/* Profile Image */}
                <div onClick={toggleDropdown} className="cursor-pointer">
                    <Image
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                        className="rounded-full"
                        width={32}
                        height={32}
                    />
                </div>

                {/* Dropdown Menu */}
                <motion.div
                    ref={dropdownRef} // Attach ref to motion.div
                    className='absolute top-7 right-0 mt-2 w-48 bg-zinc-50 rounded-lg shadow-lg z-10 p-2'
                    initial={{ scale: 0, opacity: 0 }} // Initial state
                    animate={controls} // Use animation controls
                    exit={{ scale: 0, opacity: 0 }} // Animation when exiting
                    transition={{ duration: 0.2 }} // Duration for the animation
                    style={{ originX: 1, originY: 0 }} // Transform origin
                >
                    <div className="flex flex-col space-y-2 text-center"> {/* Hide on mobile */}
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out dark:hover:bg-indigo-900"
                            >
                                Dashboard
                            </Link>
                        )}
                        {session && (
                            <Link
                                href="/profile"
                                className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out dark:hover:bg-indigo-900"
                            >
                                My Profile
                            </Link>
                        )}
                        <Button
                            onClick={() => signOut({
                                redirect: true,
                                callbackUrl: `${window.location.origin}/sign-in`
                            })}
                            variant='destructive'
                        >
                            Sign Out
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return null; // Return null if session is not available
};

export default UserAccountNav;
