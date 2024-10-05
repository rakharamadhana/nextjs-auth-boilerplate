import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedButton from "@/components/AnimatedButton";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session?.user) {
        return (
            <AnimatedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-3xl font-bold text-red-500">
                    Please log in to view this admin page.
                </h2>
            </AnimatedSection>
        );
    }

    // Admin page content if user is authenticated
    return (
        <div className="flex flex-col items-center justify-center p-6">
            {/* Admin Hero Section */}
            <section
                className="w-full pt-5 pb-2 text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold text-indigo-800 mb-4">
                        Dashboard
                    </h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Manage users, courses, and mentoring program settings for <b>Admin</b>.
                    </p>
                </div>
            </section>

            {/* User Info Section */}
            <AnimatedSection
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 w-full max-w-4xl">
                <div className="border rounded-md p-6 mt-6 bg-white shadow-lg w-full">
                    <h2 className="text-xl font-semibold text-indigo-700">
                        Welcome back, {session.user.name}!
                    </h2>
                    <p className="text-md text-gray-600 mt-2">
                        Email: {session.user.email}
                    </p>
                </div>
            </AnimatedSection>

            {/* Admin Actions Section */}
            <section
                className="mt-12 flex space-x-4">
                <AnimatedButton href="/admin" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Manage Users
                </AnimatedButton>
                <AnimatedButton href="/admin" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Manage Courses
                </AnimatedButton>
                <AnimatedButton href="/admin" className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    Settings
                </AnimatedButton>
            </section>
        </div>
    );
}
