'use client';

import Link from "next/link";
import { useState } from "react";

const MobileMenuToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false); // Close the menu when a link is clicked
    };

    return (
        <div className="relative">
            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-gray-800 transition-colors duration-300"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute top-12 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out transform rounded-xl w-max ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
                style={{ transformOrigin: 'top right' }} // Set the origin for the scaling effect
            >
                <div className="flex flex-col space-y-2 p-2 max-w-max">
                    <Link href='/profile' className="block text-sm font-medium p-2 rounded-xl hover:bg-gray-200 transition duration-200" onClick={handleLinkClick}>
                        User Profile
                    </Link>
                    <Link href='/admin' className="block text-sm font-medium p-2 rounded-xl hover:bg-gray-200 transition duration-200" onClick={handleLinkClick}>
                        Admin Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MobileMenuToggle;
