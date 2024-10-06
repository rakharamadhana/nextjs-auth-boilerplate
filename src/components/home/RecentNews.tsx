import RecentNewsClient from './RecentNewsClient';

export default async function RecentNewsLayout() {

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Recent News</h2>
                <RecentNewsClient /> {/* This is the client-side component */}
            </div>
        </section>
    );
}
