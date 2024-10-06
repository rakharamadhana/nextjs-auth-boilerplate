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

            <section
                className="text-center mt-12"
            >
                <h2 className="text-4xl font-extrabold text-indigo-700">
                    Welcome to the Mentoring Program!
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                    Learn, grow, and succeed with personalized mentorship tailored just for you.
                </p>
            </section>

            <section
                className="mt-2 w-full max-w-2xl"
            >
                <User />
            </section>

            <section
                className="mt-2 w-full max-w-2xl"
            >
                <div className="border rounded-md p-6 mt-6 bg-white shadow-lg w-full">
                    <h2 className="text-lg font-semibold">Server Session</h2>
                    <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </section>

            <section className="mt-12 flex space-x-4">
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
