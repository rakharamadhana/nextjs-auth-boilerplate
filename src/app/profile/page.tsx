import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedButton from "@/components/AnimatedButton";
import EditProfileForm from "@/components/form/EditProfileForm";

const ProfilePage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <section className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6">My Profile</section>

            {/* Profile Image */}
            {session ? (
                <AnimatedSection
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center">
                    <Image
                        src={session?.user.image ?? "/default-profile.png"}
                        alt={session?.user.name ?? "User"}
                        className="rounded-full mb-6 shadow-lg"
                        width={120}
                        height={120}
                    />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                        Hello, <span className="text-indigo-600">{session?.user.name}</span>
                    </p>
                </AnimatedSection>
            ) : null}

            {/* Profile Information */}
            <AnimatedSection
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5, delay: 0.5}}
                className="border bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-xl mx-auto">
                <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">Account Information</h2>
                <EditProfileForm />
            </AnimatedSection>


            {/* Actions Section */}
            <section
                className="mt-8 flex space-x-4">
                <AnimatedButton logOut={true} href="/sign-out"
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Sign Out
                </AnimatedButton>
            </section>
        </div>
    );
};

export default ProfilePage;
