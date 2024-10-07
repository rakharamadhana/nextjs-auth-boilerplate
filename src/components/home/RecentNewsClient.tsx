"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module
import { motion, useScroll, useTransform } from 'framer-motion';

import 'swiper/css/bundle';

// Simulated function to fetch news data
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
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentNews();
            setNewsItems(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,

    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.6]); // Scale up at the top and down at the bottom

    if (loading) {
        return (
            <div className="flex space-x-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden animate-pulse w-72">
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
        <motion.div
            ref={ref}
            style={{
                scale: scale,
            }}
            transition={{ duration: 0.3 }} // Optional: for smoother transitions
        >
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
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {newsItems.map((item) => (
                    <SwiperSlide key={item.id} className="pb-6">
                        <Card className="overflow-hidden hover:bg-gray-100 transition-colors duration-100">
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
        </motion.div>
    );
}
