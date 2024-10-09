import OurMentorClient from "@/components/home/OurMentorClient";

export default function OurMentor() {
    return (
        <section className="py-8 sm:py-12 w-full">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-indigo-700 dark:text-indigo-500">
                    Meet Our Mentors
                </h2>
                <OurMentorClient />
            </div>
        </section>
    );
}
