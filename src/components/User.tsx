'use client'

import { useSession } from "next-auth/react";

const User = () => {
    const { data: session } = useSession();

    return (
        <div className="border rounded-md p-4 mt-2 bg-gray-50 w-full max-w-md">
            <h2 className="text-lg font-semibold">User Session</h2>
            <code className="whitespace-pre-wrap">{JSON.stringify(session, null, 2)}</code>
        </div>
    );
};

export default User;
