"use client"

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module

import 'swiper/css/bundle';
import {useEffect, useState} from "react";

// Simulated function to fetch testimonies data
async function getTestimonies() {
    // In a real application, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    return [
        {
            id: 1,
            name: "Alice Brown",
            feedback: "This platform has completely transformed the way I learn. The mentors are incredibly knowledgeable and supportive.",
            occupation: "Software Developer",
            imageUrl: "https://placehold.co/100x100.png"
        },
        {
            id: 2,
            name: "Carlos Garcia",
            feedback: "I found the resources here to be top-notch. It was an amazing experience to get mentorship from industry experts.",
            occupation: "Data Analyst",
            imageUrl: "https://placehold.co/100x100.png"
        },
        {
            id: 3,
            name: "Emily White",
            feedback: "The learning experience has been smooth and very engaging. Highly recommend it for anyone looking to upskill.",
            occupation: "Project Manager",
            imageUrl: "https://placehold.co/100x100.png"
        },
        {
            id: 4,
            name: "Sussie Jane",
            feedback: "Best mentoring there is to provide good quality of motivation achiever. Lorem ipsum dolor ist amit",
            occupation: "Software Engineer",
            imageUrl: "https://placehold.co/100x100.png"
        }
    ]
}

type TestimonyItem = {
    id: number;
    name: string;
    feedback: string;
    occupation: string;
    imageUrl: string;
};

export default function TestimoniesClient() {
    const [testimonyItems, setTestimonyItems] = useState<TestimonyItem[]>([]); // Explicitly set the state type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTestimonies();
            setTestimonyItems(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Swiper
            modules={[Autoplay]} // Add Autoplay module
            autoplay={{
                delay: 3000, // Delay between transitions (3 seconds)
                disableOnInteraction: false, // Allow autoplay to continue after user interactions
            }}
            spaceBetween={30}
            speed={1000}
            slidesPerView={3} // Adjust this for how many slides you want to show at once
        >
            {testimonyItems.map((testimony) => (
                <SwiperSlide key={testimony.id}>
                    <Card className="p-6 bg-white shadow-lg rounded-lg">
                        {/* Testimony Info */}
                        <div className="flex items-start">
                            {/* Circular Image */}
                            <div className="w-16 h-16 flex-shrink-0 mr-4">
                                <Image
                                    src={testimony.imageUrl}
                                    alt={testimony.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl font-semibold">{testimony.name}</CardTitle>
                                    <CardDescription className="text-gray-500">{testimony.occupation}</CardDescription>
                                </CardHeader>
                            </div>
                        </div>
                        <CardContent className="mt-4">
                            <p className="italic text-gray-700">&quot;{testimony.feedback}&quot;</p>
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
