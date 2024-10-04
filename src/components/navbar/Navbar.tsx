import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "@/components/UserAccountNav";
import Image from "next/image";
import MobileMenuToggle from "@/components/navbar/MobileMenuToggle";

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    // Check if the user is an admin
    const isAdmin = session?.user?.role === 'admin';

    return (
        <header className='bg-zinc-100 py-2 border-b border-s-zinc-200 w-full z-10 top-0 px-4'>
            <div className='container mx-auto flex items-center justify-between p-4 md:p-0'>
                {/* Left Side - Logo and Menu */}
                <div className="flex items-center space-x-6">
                    <Link href='/' passHref>
                        <Image
                            src="/icons/icon512_rounded.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-6"> {/* Hide on mobile */}
                        {session && ( // Conditionally render User Profile link
                            <Link href='/profile' className="text-sm font-medium">
                                User Profile
                            </Link>
                        )}
                        {isAdmin && ( // Conditionally render Admin Dashboard link
                            <Link href='/admin' className="text-sm font-medium">
                                Admin Dashboard
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right Side - Mobile Menu Toggle Button */}
                <MobileMenuToggle />

                {/* Centered - Sign In/Sign Out */}
                <div className="hidden md:flex items-center space-x-4"> {/* Only show on desktop */}
                    <UserAccountNav />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
