// news/page.tsx
import React from 'react';
import Link from 'next/link';

// Define the type for the articles
interface Article {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
}

// Dummy data for demonstration; replace with actual data fetching logic
const articles: Article[] = [
    {
        id: 1,
        title: "New Breakthrough in Quantum Computing",
        description: "Scientists achieve major milestone in quantum supremacy.",
        date: "2023-10-05",
        imageUrl: "https://placehold.co/400x200.png",
    },
    {
        id: 2,
        title: "Global Climate Summit Announces New Targets",
        description: "World leaders agree on ambitious goals to combat climate change.",
        date: "2023-10-04",
        imageUrl: "https://placehold.co/400x200.png",
    },
    {
        id: 3,
        title: "Tech Giant Unveils Revolutionary AI Assistant",
        description: "New AI technology promises to transform daily life and work.",
        date: "2023-10-03",
        imageUrl: "https://placehold.co/400x200.png",
    },
    {
        id: 4,
        title: "Advancements in Renewable Energy Technologies",
        description: "New technologies are making renewable energy more efficient and affordable.",
        date: "2023-10-02",
        imageUrl: "https://placehold.co/400x200.png",
    },
    {
        id: 5,
        title: "Breakthroughs in Cancer Research",
        description: "Researchers discover new methods to treat various types of cancer.",
        date: "2023-10-01",
        imageUrl: "https://placehold.co/400x200.png",
    }
];

const NewsPage: React.FC = () => {
    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">News</h1>
            <ul className="space-y-4">
                {articles.map((item) => (
                    <li key={generateSlug(item.title)}>
                        <Link href={`/news/${generateSlug(item.title)}`} className="text-blue-600 hover:underline">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsPage;
