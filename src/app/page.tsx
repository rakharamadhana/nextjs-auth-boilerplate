import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedButton from "@/components/AnimatedButton";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center w-full fade-in">
            <AnimatedSection
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }} // Custom initial state for the title section
                animate={{ opacity: 1, y: 0 }} // Custom animate state for the title section
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} // Staggered delay for the title section
            >
                <h2 className="text-4xl font-extrabold text-indigo-700">
                    Welcome to the Mentoring Program!
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                    Learn, grow, and succeed with personalized mentorship tailored just for you.
                </p>
            </AnimatedSection>

            <AnimatedSection
                className="mt-2 w-full max-w-2xl"
                initial={{ opacity: 0, x:20 }} // Custom initial state for the user section
                animate={{ opacity: 1, x:0 }} // Custom animate state for the user section
                transition={{ duration: 0.5, delay: 0.3 }} // Staggered delay for the user section
            >
                <User />
            </AnimatedSection>

            <AnimatedSection
                className="mt-2 w-full max-w-2xl"
                initial={{ opacity: 0, x:-20 }} // Custom initial state for the session info section
                animate={{ opacity: 1, x:0 }} // Custom animate state for the session info section
                transition={{ duration: 0.5, delay: 0.5 }} // Staggered delay for the session info section
            >
                <div className="border rounded-md p-6 mt-6 bg-white shadow-lg w-full">
                    <h2 className="text-lg font-semibold">Server Session</h2>
                    <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </AnimatedSection>

            <AnimatedSection
                className="mt-12 flex space-x-4"
                initial={{ opacity: 0, scale: 0.5 }} // Initial state: transparent and small
                animate={{ opacity: 1, scale: 1 }} // Animate to fully visible and normal size
                transition={{ duration: 0.5, delay: 0.7 }} // Staggered delay for the button section
            >
                <AnimatedButton href="/" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Get Started
                </AnimatedButton>
                <AnimatedButton href="/" className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    Explore Courses
                </AnimatedButton>
            </AnimatedSection>
        </div>
    );
}
