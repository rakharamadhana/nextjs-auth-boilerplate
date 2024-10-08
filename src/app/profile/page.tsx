import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import AnimatedButton from "@/components/animated/AnimatedButton";
import EditProfileForm from "@/components/form/EditProfileForm";

const ProfilePage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
            {/* Heading */}
            <section className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-800 mb-4 sm:mb-6 text-center">
                My Profile
            </section>

            {/* Profile Image */}
            {session ? (
                <section className="flex flex-col items-center">
                    <Image
                        src={session?.user.image ?? "/default-profile.png"}
                        alt={session?.user.name ?? "User"}
                        className="rounded-full mb-4 sm:mb-6 shadow-lg"
                        width={100}
                        height={100}
                        sizes="(max-width: 768px) 100px, 120px"
                    />
                    <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center">
                        Hello, <span className="text-indigo-600">{session?.user.name}</span>
                    </p>
                </section>
            ) : null}

            {/* Profile Information */}
            <section className="border bg-white shadow-lg rounded-lg xl:w-[30rem] lg:w-96 p-4 sm:p-6 mt-4 sm:mt-6 w-full max-w-lg mx-auto">
                <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-4 text-center">
                    Account Information
                </h2>
                <EditProfileForm />
            </section>

            {/* Actions Section */}
            <section className="mt-6 sm:mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <AnimatedButton logOut={true} href="/sign-out" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto">
                    Sign Out
                </AnimatedButton>
            </section>
        </div>
    );
};

export default ProfilePage;
