import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AnimatedButton from "@/components/animated/AnimatedButton";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session?.user) {
        return (
            <section className="flex flex-col items-center justify-center min-h-screen p-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-red-500 text-center">
                    Please log in to view this admin page.
                </h2>
            </section>
        );
    }

    // Admin page content if user is authenticated
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
            {/* Admin Hero Section */}
            <section className="w-full pt-4 pb-2 text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-bold text-indigo-800 mb-4 dark:text-indigo-500">
                        Dashboard
                    </h1>
                    <p className="text-md sm:text-lg text-gray-700 dark:text-primary mb-6 sm:mb-8">
                        Manage users, courses, and mentoring program settings for <b>Admin</b>.
                    </p>
                </div>
            </section>

            {/* User Info Section */}
            <section className="mt-4 w-full max-w-4xl px-4 sm:px-0">
                <div className="border rounded-md p-4 sm:p-6 mt-4 sm:mt-6 bg-white shadow-lg w-full">
                    <h2 className="text-lg sm:text-xl font-semibold text-indigo-700">
                        Welcome back, {session.user.name}!
                    </h2>
                    <p className="text-sm sm:text-md text-gray-600 mt-2">
                        Email: {session.user.email}
                    </p>
                </div>
            </section>

            {/* Admin Actions Section */}
            <section className="mt-8 sm:mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 xs:w-full px-4 sm:px-0 text-center">
                <AnimatedButton href="/admin" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto">
                    Manage Users
                </AnimatedButton>
                <AnimatedButton href="/admin" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full sm:w-auto">
                    Manage Courses
                </AnimatedButton>
                <AnimatedButton href="/admin" className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 w-full sm:w-auto">
                    Settings
                </AnimatedButton>
            </section>
        </div>
    );
}
