"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';

async function getRecentActivities() {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return [
        { id: 1, title: "Completed Project X", description: "Successfully delivered the milestone for Project X.", date: "2023-10-02", imageUrl: "https://placehold.co/400x200.png" },
        { id: 2, title: "Team Building Workshop", description: "Attended a workshop on effective team collaboration.", date: "2023-09-28", imageUrl: "https://placehold.co/400x200.png" },
        { id: 3, title: "Client Meeting", description: "Held a meeting with a major client to discuss new opportunities.", date: "2023-09-25", imageUrl: "https://placehold.co/400x200.png" },
        { id: 4, title: "Launched New Marketing Campaign", description: "Successfully launched a new marketing campaign.", date: "2023-09-20", imageUrl: "https://placehold.co/400x200.png" },
        { id: 5, title: "Conducted User Research", description: "Conducted user research for upcoming product features.", date: "2023-09-15", imageUrl: "https://placehold.co/400x200.png" },
    ];
}

type ActivitiesItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
};

export default function RecentActivitiesClient() {
    const [activityItems, setActivityItems] = useState<ActivitiesItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentActivities();
            setActivityItems(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden animate-pulse">
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
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }}
            spaceBetween={30}
            loop={true}
            speed={3000}
            breakpoints={{
                // When window width is >= 640px (mobile devices)
                640: {
                    slidesPerView: 1,
                },
                // When window width is >= 768px (tablets)
                768: {
                    slidesPerView: 2,
                },
                // When window width is >= 1024px (desktops)
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {activityItems.map((item) => (
                <SwiperSlide key={item.id} className='pb-6'>
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
