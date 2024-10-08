// AboutUsDropdown.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const AboutUsDropdown = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="text-sm font-medium hover:bg-indigo-100 rounded-lg p-2 transition-all duration-100 ease-out dark:hover:bg-indigo-900 flex items-center"
            >
                About Us
                <FontAwesomeIcon
                    icon={isDropdownOpen ? faAngleUp : faAngleDown}
                    className="ml-1"
                />
            </button>
            {isDropdownOpen && (
                <motion.div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 p-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0, originY: 0 }}
                >
                    <Link href="/about/introduction" className="block text-sm hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out dark:hover:bg-indigo-900">
                        Introduction
                    </Link>
                    <Link href="/about/team" className="block text-sm hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out dark:hover:bg-indigo-900">
                        Team
                    </Link>
                    <Link href="/about/mentors" className="block text-sm hover:bg-indigo-100 rounded-lg p-2 transition duration-300 ease-in-out dark:hover:bg-indigo-900">
                        Mentor
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default AboutUsDropdown;
