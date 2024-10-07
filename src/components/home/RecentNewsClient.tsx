"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module

import 'swiper/css/bundle';

// Simulated function to fetch news data (you may keep this in the server-side component if you prefer)
async function getRecentNews() {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return [
        { id: 1, title: "New Breakthrough in Quantum Computing", description: "Scientists achieve major milestone in quantum supremacy.", date: "2023-10-05", imageUrl: "https://placehold.co/400x200.png" },
        { id: 2, title: "Global Climate Summit Announces New Targets", description: "World leaders agree on ambitious goals to combat climate change.", date: "2023-10-04", imageUrl: "https://placehold.co/400x200.png" },
        { id: 3, title: "Tech Giant Unveils Revolutionary AI Assistant", description: "New AI technology promises to transform daily life and work.", date: "2023-10-03", imageUrl: "https://placehold.co/400x200.png" },
        { id: 4, title: "Advancements in Renewable Energy Technologies", description: "New technologies are making renewable energy more efficient and affordable.", date: "2023-10-02", imageUrl: "https://placehold.co/400x200.png" },
        { id: 5, title: "Breakthroughs in Cancer Research", description: "Researchers discover new methods to treat various types of cancer.", date: "2023-10-01", imageUrl: "https://placehold.co/400x200.png" }
    ];
}

type NewsItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
};

export default function RecentNewsClient() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]); // Explicitly set the state type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentNews();
            setNewsItems(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex space-x-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden animate-pulse w-72">
                        {/* Placeholder image */}
                        <div className="h-48 bg-gray-300"></div>
                        <CardHeader>
                            <CardTitle className="h-6 bg-gray-300 rounded w-3/4 mb-2"></CardTitle>
                            <CardDescription className="h-4 bg-gray-300 rounded w-1/2"></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="h-4 bg-gray-300 rounded w-3/4"></p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }}
            spaceBetween={30}
            loop={true}
            speed={2000}
            breakpoints={{
                // When window width is >= 640px (mobile devices)
                640: {
                    slidesPerView: 1, // 1 slide
                },
                // When window width is >= 768px (tablets)
                768: {
                    slidesPerView: 2, // 2 slides
                },
                // When window width is >= 1024px (desktops)
                1024: {
                    slidesPerView: 3, // 3 slides
                },
                // When window width is >= 1280px (large desktops)
                1280: {
                    slidesPerView: 4, // 4 slides
                },
            }}
        >
            {newsItems.map((item) => (
                <SwiperSlide key={item.id} className="pb-6">
                    <Card className="overflow-hidden">
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover"
                        />
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{new Date(item.date).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{item.description}</p>
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
