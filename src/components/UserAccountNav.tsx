"use client";

import React from "react";
import { buttonVariants } from './ui/button';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface UserAccountNavProps {
    mobile?: boolean; // Optional prop for mobile styling
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ mobile }) => {
    const { data: session } = useSession();

    // Class for user's name on mobile
    const userClass = mobile ? "text-sky-600 text-center text-sm" : "text-sky-600";

    if (session && session.user) {
        return (
            <div className={`flex ${mobile ? 'flex-col items-stretch' : 'flex-row items-center gap-2 ml-auto p-2'} `}>
                {!mobile && (
                    <Image
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                        className="rounded-full"
                        width={32}
                        height={32}
                    />
                )}
                {!mobile && (
                    <p className={userClass}>{session.user.name}</p>
                )}
                <Button
                    onClick={() => signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}/sign-in`
                    })}
                    variant='destructive'
                    size={`${mobile ? 'sm' : 'default'}`}
                    className={`${mobile ? 'px-2 py-1' : 'px-4 py-2'}`}
                >
                    Sign Out
                </Button>
            </div>
        );
    }

    return (
        <Link className={buttonVariants()} href='/sign-in'>
            Sign in
        </Link>
    );
};

export default UserAccountNav;
