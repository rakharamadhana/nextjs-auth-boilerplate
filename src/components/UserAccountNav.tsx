"use client";

import React from "react";
import { buttonVariants } from './ui/button';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import Image from "next/image";
import {Button} from "@/components/ui/button";

const UserAccountNav = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex gap-4 ml-auto items-center">
                <p className="text-sky-600">{session.user.name}</p>
                <Image
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? ""}
                    className=" rounded-full"
                    width={32}
                    height={32}
                />
                <Button onClick={() => signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/sign-in`
                })} variant='destructive'>
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