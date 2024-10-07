import TestimoniesClient from "@/components/home/TestimoniesClient";

export default function Testimonies() {

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">What Our Learners Say</h2>
                {/* Swiper for carousel */}
                <TestimoniesClient />
            </div>
        </section>
    )
}
