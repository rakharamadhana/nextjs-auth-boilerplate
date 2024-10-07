import User from "@/components/User";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export default async function TestSession() {
    const session = await getServerSession(authOptions)

    return (
        <>
            <section
                className="mt-2 w-full max-w-2xl"
            >
                <User/>
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
        </>
    )
        ;
}
