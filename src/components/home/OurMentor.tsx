"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from "swiper/modules";

// Simulated function to fetch mentor data
async function getMentors() {
    // In a real application, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return [
        {
            id: 1,
            name: "Dr. John Doe",
            expertise: "Data Science",
            bio: "Dr. John has over 15 years of experience in data science and machine learning, with a PhD from MIT.",
            imageUrl: "https://placehold.co/800x800.png"
        },
        {
            id: 2,
            name: "Jane Smith",
            expertise: "Software Engineering",
            bio: "Jane is a senior software engineer specializing in building scalable web applications with 10+ years of experience.",
            imageUrl: "https://placehold.co/800x800.png"
        },
        {
            id: 3,
            name: "Michael Johnson",
            expertise: "Cybersecurity",
            bio: "Michael is a certified cybersecurity expert who has led security teams at top tech companies for over a decade.",
            imageUrl: "https://placehold.co/800x800.png"
        },
        {
            id: 4,
            name: "Emily Davis",
            expertise: "Product Management",
            bio: "Emily has a strong background in product management and has successfully launched several tech products.",
            imageUrl: "https://placehold.co/800x800.png"
        },
        {
            id: 5,
            name: "David Wilson",
            expertise: "Cloud Computing",
            bio: "David is a cloud computing architect with extensive experience in designing scalable cloud solutions.",
            imageUrl: "https://placehold.co/800x800.png"
        },
        {
            id: 6,
            name: "Sarah Brown",
            expertise: "UI/UX Design",
            bio: "Sarah is a UI/UX designer with a passion for creating user-friendly interfaces and enhancing user experiences.",
            imageUrl: "https://placehold.co/800x800.png"
        }
    ];
}

export default async function OurMentor() {
    const mentors = await getMentors();

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Meet Our Mentors</h2>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={4} // Show 4 slides at a time
                    loop={true} // Enable looping
                    autoplay={{
                        delay: 0, // Set delay to 0 for continuous movement
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    speed={3000} // Set speed for smoother effect (you can adjust this)
                >
                    {mentors.map((mentor) => (
                        <SwiperSlide key={mentor.id}>
                            <Card className="flex flex-col items-center text-center p-4 border-0 shadow-none">
                                {/* Circular Image */}
                                <div className="w-40 h-40 mb-4">
                                    <Image
                                        src={mentor.imageUrl}
                                        alt={mentor.name}
                                        width={160}
                                        height={160}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                {/* Mentor Info */}
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">{mentor.name}</CardTitle>
                                    <CardDescription className="text-gray-500">{mentor.expertise}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700">{mentor.bio}</p>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
