import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AnimatedSection from "@/components/animated/AnimatedSection";
import AnimatedButton from "@/components/animated/AnimatedButton";
import Hero from "@/components/home/Hero";
import RecentNews from "@/components/home/RecentNews";
import RecentActivities from "@/components/home/RecentActivities";
import OurMentor from "@/components/home/OurMentor";
import Testimonies from "@/components/home/Testimonies";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center w-full fade-in">
            <Hero />
            <RecentNews />
            <RecentActivities />
            <OurMentor />
            <Testimonies />

            <section className="py-12 flex space-x-4">
                <AnimatedButton href="/" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Get Started
                </AnimatedButton>
                <AnimatedButton href="/" className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    Explore Courses
                </AnimatedButton>
            </section>
        </div>
    );
}
