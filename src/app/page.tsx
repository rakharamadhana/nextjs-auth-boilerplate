import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className='text-2xl font-bold'>Home</h1>
            <User/>
            <div className="border rounded-md p-4 mt-2 bg-gray-50 w-full max-w-md">
                <h2 className="text-lg font-semibold">Server Session</h2>
                <code
                    className="whitespace-pre-wrap ">{JSON.stringify(session, null, 2)}</code>
            </div>
        </div>
    );
}
