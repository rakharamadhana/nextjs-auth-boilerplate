"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from "swiper/modules";
import {useEffect, useRef, useState} from "react";
import {useScroll, useTransform, motion} from "framer-motion";

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

type MentorItem = {
    id: number;
    name: string;
    expertise: string;
    bio: string;
    imageUrl: string;
};

export default function OurMentorClient() {
    const [mentorItems, setMentorItems] = useState<MentorItem[]>([]); // Explicitly set the state type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMentors();
            setMentorItems(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,

    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]); // Scale up at the top and down at the bottom

    if (loading) {
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 place-items-center mx-auto'>
                {Array.from({length: 4}).map((_, index) => (
                    <Card key={index} className="flex flex-col items-center text-center p-2 border-0 shadow-none hover:bg-zinc-100 dark:border-2 dark:border-indigo-400 dark:hover:bg-indigo-800 transition-all duration-200">
                        {/* Circular Image */}
                        <div className="w-40 h-40 mb-4 bg-gray-300 rounded-full">
                        </div>
                        {/* Mentor Info */}
                        <CardHeader>
                            <CardTitle className="w-24 h-6 bg-gray-300 rounded-lg items-center mx-auto"></CardTitle>
                            <CardDescription className="w-32 h-4 bg-gray-300 rounded-lg items-center mx-auto"></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="bg-gray-300 w-40 h-32 rounded-lg items-center mx-auto"></p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scale,
            }}
            transition={{ duration: 0.3 }} // Optional: for smoother transitions
        >
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                loop={true} // Enable looping
                autoplay={{
                    delay: 0, // Set delay to 0 for continuous movement
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                speed={3000} // Set speed for smoother effect (you can adjust this)
                breakpoints={{
                    // Responsive breakpoints
                    640: {
                        slidesPerView: 2, // Show 2 slides at a time on small screens
                    },
                    768: {
                        slidesPerView: 3, // Show 3 slides at a time on medium screens
                    },
                    1024: {
                        slidesPerView: 4, // Show 4 slides at a time on large screens
                    },
                }}
            >
                {mentorItems.map((mentor) => (
                    <SwiperSlide key={mentor.id}>
                        <Card className="flex flex-col items-center text-center p-2 border-0 shadow-none hover:bg-zinc-100 dark:border-2 dark:border-indigo-400 dark:hover:bg-indigo-800 transition-all duration-200">
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
                                <CardDescription className="text-gray-500 dark:text-primary">{mentor.expertise}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-primary">{mentor.bio}</p>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
}
