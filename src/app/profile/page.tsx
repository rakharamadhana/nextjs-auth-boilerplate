import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

const ProfilePage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className='text-2xl md:text-3xl font-bold mb-4'>Profile</h1>
            {/* Profile Image */}
            {session ? (
                <Image
                    src={session?.user.image ?? ""}
                    alt={session?.user.name ?? ""}
                    className="rounded-full mb-4" // Added margin-bottom for spacing
                    width={100}
                    height={100}
                />
            ) : null}

            {/* Profile Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 mt-4 w-full max-w-lg">
                <p className="font-semibold">Name:</p>
                <p>{session?.user.name}</p>
                <p className="font-semibold">Email:</p>
                <p>{session?.user.email}</p>
                <p className="font-semibold">Role:</p>
                <p>{session?.user.role}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
