import RecentActivitiesClient from "@/components/home/RecentActivitiesClient";

export default async function RecentActivities() {

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Recent Activities</h2>
                <RecentActivitiesClient />
            </div>
        </section>
    )
}
