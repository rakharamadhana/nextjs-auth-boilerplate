// Navbar.tsx
"use client";

import Link from "next/link";
import UserAccountNav from "@/components/UserAccountNav";
import Image from "next/image";
import MobileMenuToggle from "@/components/navbar/MobileMenuToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import AboutUsDropdown from "./AboutUsDropdown";

const Navbar = ({ session }: { session: any }) => {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const navWidth = useTransform(scrollY, [0, 200], ["100%", "80%"]);
    const borderRadius = useTransform(scrollY, [0, 200], ["0", "3rem"]);
    const navTop = useTransform(scrollY, [0, 100], ["0rem", "1rem"]);
    const isHomePath = pathname === "/";
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (darkMode) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [darkMode]);

    // UseEffect to handle loading state
    useEffect(() => {
        // Simulate loading finished event or trigger when page is fully loaded
        setLoading(false);
    }, []); // Empty dependency array ensures it runs after the initial render

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    if (loading) {
        return (
            <header
                className="z-10 w-full p-3 mx-auto bg-opacity-60 bg-gradient-to-b from-zinc-100 via-zinc-50 to-transparent"
            >
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse'></div>
                        <div className="hidden md:flex space-x-3">
                            <div className='w-16 bg-gray-300 rounded-lg h-4'></div>
                            <div className='w-16 bg-gray-300 rounded-lg h-4'></div>
                            <div className='w-16 bg-gray-300 rounded-lg h-4'></div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className='w-20 bg-gray-300 rounded-lg h-10'></div>
                        <div className='w-10 bg-gray-300 rounded-lg h-10'></div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <motion.header
            className="z-10 p-3 mx-auto bg-opacity-60 bg-gradient-to-b from-zinc-100 via-zinc-50 to-transparent transition-all duration-75 ease-out dark:from-indigo-600 dark:via-indigo-950"
            style={{
                position: isHomePath ? "sticky" : "relative",
                width: isHomePath ? navWidth : "100%",
                borderRadius: isHomePath ? borderRadius : "0",
                top: isHomePath ? navTop : "0rem",
            }}
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href="/" passHref>
                        <Image
                            src="/icons/icon512_rounded.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                    <div className="hidden md:flex space-x-3">
                        <Link
                            href="/news"
                            className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition-all duration-100 ease-out dark:hover:bg-indigo-900"
                        >
                            News
                        </Link>
                        <Link
                            href="/activities"
                            className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition-all duration-100 ease-out dark:hover:bg-indigo-900"
                        >
                            Activities
                        </Link>

                        {/* Replace About Us Dropdown with the new component */}
                        <AboutUsDropdown/>
                    </div>
                </div>

                <MobileMenuToggle/>

                <div className="flex items-center space-x-4">
                    {session ? (
                        <UserAccountNav/>
                    ) : (
                        <Link className={buttonVariants({variant: "outline"})} href="/sign-in">
                            Sign in
                        </Link>
                    )}

                    <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
                        {darkMode ? (
                            <FontAwesomeIcon icon={faMoon} className="h-5 w-5"/>
                        ) : (
                            <FontAwesomeIcon icon={faSun} className="h-5 w-5"/>
                        )}
                    </Button>
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;
