"use client";

import Link from "next/link";
import UserAccountNav from "@/components/UserAccountNav";
import Image from "next/image";
import MobileMenuToggle from "@/components/navbar/MobileMenuToggle";
import { buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const Navbar = ({ session }: { session: any }) => {
    // Check if the user is an admin
    const isAdmin = session?.user?.role === "admin";

    // Framer Motion - Use the scroll position to adjust styles
    const { scrollY } = useScroll();

    // Width and border-radius transformations
    const navWidth = useTransform(scrollY, [0, 200], ["100%", "90%"]); // Full width to 80% when scrolling
    const borderRadius = useTransform(scrollY, [0, 200], ["0", "3rem"]); // No border-radius to a rounded one

    // Adjust the top position to create a floating effect
    const navTop = useTransform(scrollY, [0, 100], ["0rem", "1rem"]); // Start at 3rem from top, move to 0rem

    return (
        <motion.header
            className="sticky z-10 p-3 mx-auto shadow-sm"
            style={{
                backgroundColor: `rgba(255, 255, 255, 0.6)`,
                width: navWidth,
                borderRadius: borderRadius,
                top: navTop, // Use navTop for the top position
                borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
                transition: "all 0.3s ease",
            }}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Left Side - Logo and Menu */}
                <div className="flex items-center space-x-6">
                    <Link href="/" passHref>
                        <Image
                            src="/icons/icon512_rounded.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-3"> {/* Hide on mobile */}
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out"
                            >
                                Dashboard
                            </Link>
                        )}
                        {session && (
                            <Link
                                href="/profile"
                                className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out"
                            >
                                My Profile
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right Side - Mobile Menu Toggle Button */}
                <MobileMenuToggle />

                {/* Centered - Sign In/Sign Out */}
                <div className="hidden md:flex items-center space-x-4"> {/* Only show on desktop */}
                    {session ? (
                        <UserAccountNav />
                    ) : (
                        <Link className={buttonVariants()} href="/sign-in">
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;
