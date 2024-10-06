'use client'

import { useSession } from "next-auth/react";

const User = () => {
    const { data: session, status } = useSession(); // `status` provides the loading state

    if (status === "loading") {
        return (
            <div className="border rounded-md p-6 mt-6 bg-white shadow-lg w-full">
                <h2 className="text-lg font-semibold">Client Session</h2>
                <div className="animate-pulse bg-gray-100 p-4 rounded-md text-sm h-[15rem]">
                </div>
            </div>
        );
    }

    return (
        <div className="border rounded-md p-6 mt-6 bg-white shadow-lg w-full">
        <h2 className="text-lg font-semibold">Client Session</h2>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md">
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
};

export default User;
