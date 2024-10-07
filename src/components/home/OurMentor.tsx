import 'swiper/swiper-bundle.css';
import OurMentorClient from "@/components/home/OurMentorClient";

export default function OurMentor() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Meet Our Mentors</h2>
                <OurMentorClient />
            </div>
        </section>
    );
}
