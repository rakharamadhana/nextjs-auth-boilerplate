'use client';

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Access Denied</h1>
            <p className="mt-4 text-center text-gray-700 max-w-md">
                You need to log in as an admin to access this page.
            </p>
            <p className="mt-2 text-center">
                Please <a href="/sign-in" className="text-blue-600 hover:underline">sign in</a> with an admin account.
            </p>
        </div>
    );
}
