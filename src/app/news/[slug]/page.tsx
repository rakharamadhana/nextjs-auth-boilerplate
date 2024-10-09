// news/[slug]/page.tsx
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

// Define the type for the article
interface Article {
    title: string;
    featured_image: string;
    content: string;
    author: string;
    postedAt: string; // e.g., "October 9, 2024"
    readCount: number;
    tags: string[];
    likesCount?: number;
    commentsCount?: number;
    sharesCount?: number;
    recommendations: { title: string }[]; // Other articles from the same author or tags
}

// Dummy data fetching function
async function fetchArticle(slug: string): Promise<Article> {
    // Example mapping of titles to slugs
    const articles = [
        {
            slug: 'new-breakthrough-in-quantum-computing',
            title: 'New Breakthrough in Quantum Computing',
            description: "Scientists achieve major milestone in quantum supremacy.",
            date: "2023-10-05",
            imageUrl: "https://placehold.co/600x300.png",
            likesCount: 12,
            commentsCount: 5,
            sharesCount: 3,
            content: '', // Add any default content if needed
            author: 'Jane Doe', // Use the appropriate author
            postedAt: 'October 5, 2023', // Change to the formatted date
            readCount: 123, // Example read count
            tags: ['Technology', 'Quantum Computing'],
            recommendations: [
                {
                    title: 'Breakthroughs in Cancer Research',
                },
                {
                    title: 'Global Climate Summit Announces New Targets',
                }
            ] // Add recommendations if needed
        },
        {
            slug: 'global-climate-summit-announces-new-targets',
            title: 'Global Climate Summit Announces New Targets',
            description: "World leaders agree on ambitious goals to combat climate change.",
            date: "2023-10-04",
            imageUrl: "https://placehold.co/600x300.png",
            likesCount: 20,
            commentsCount: 8,
            sharesCount: 6,
            content: '',
            author: 'John Doe', // Use the appropriate author
            postedAt: 'October 4, 2023',
            readCount: 150,
            tags: ['Environment', 'Climate Change'],
            recommendations: [
                {
                    title: 'New Breakthrough in Quantum Computing',
                },
                {
                    title: 'Global Climate Summit Announces New Targets',
                }
            ]
        },
        {
            slug: 'tech-giant-unveils-revolutionary-ai-assistant',
            title: 'Tech Giant Unveils Revolutionary AI Assistant',
            description: "New AI technology promises to transform daily life and work.",
            date: "2023-10-03",
            imageUrl: "https://placehold.co/600x300.png",
            likesCount: 15,
            commentsCount: 10,
            sharesCount: 7,
            content: '',
            author: 'Emily Johnson', // Use the appropriate author
            postedAt: 'October 3, 2023',
            readCount: 200,
            tags: ['Technology', 'AI'],
            recommendations: [
                {
                    title: 'New Breakthrough in Quantum Computing',
                },
                {
                    title: 'Global Climate Summit Announces New Targets',
                }
            ]
        },
        {
            slug: 'advancements-in-renewable-energy-technologies',
            title: 'Advancements in Renewable Energy Technologies',
            description: "New technologies are making renewable energy more efficient and affordable.",
            date: "2023-10-02",
            imageUrl: "https://placehold.co/600x300.png",
            likesCount: 5,
            commentsCount: 2,
            sharesCount: 1,
            content: '',
            author: 'Mark Spencer', // Use the appropriate author
            postedAt: 'October 2, 2023',
            readCount: 75,
            tags: ['Energy', 'Renewable'],
            recommendations: [
                {
                    title: 'New Breakthrough in Quantum Computing',
                },
                {
                    title: 'Global Climate Summit Announces New Targets',
                }
            ]
        },
        {
            slug: 'breakthroughs-in-cancer-research',
            title: 'Breakthroughs in Cancer Research',
            description: "Researchers discover new methods to treat various types of cancer.",
            date: "2023-10-01",
            imageUrl: "https://placehold.co/600x300.png",
            likesCount: 30,
            commentsCount: 12,
            sharesCount: 9,
            content: '',
            author: 'Alice Carter', // Use the appropriate author
            postedAt: 'October 1, 2023',
            readCount: 180,
            tags: ['Health', 'Research'],
            recommendations: [
                {
                    title: 'New Breakthrough in Quantum Computing',
                },
                {
                    title: 'Global Climate Summit Announces New Targets',
                }
            ]
        }
    ];

    const articleData = articles.find(article => article.slug === slug);

    if (!articleData) {
        throw new Error('Article not found');
    }

    return {
        title: articleData.title,
        featured_image: articleData.imageUrl,
        content: `
            <p class="mb-4 text-justify">${articleData.description}</p>
            <h2 class="text-xl font-bold mb-2">What This Means for the Future</h2>
            <p class="mb-4 text-justify">As organizations increasingly leverage digital tools, the landscape of business operations is set to transform drastically. Analysts predict that this shift will create new opportunities while also posing challenges.</p>
            <h2 class="text-xl font-bold mb-2">Key Takeaways</h2>
            <ul class="list-disc list-inside mb-4">
                <li>Businesses must adapt to remain competitive.</li>
                <li>Collaboration between technology firms and traditional industries is essential.</li>
                <li>Continuous learning and upskilling will be crucial for workforce readiness.</li>
            </ul>
            <p class="text-justify">For more details, stay tuned for further updates on this developing story.</p>
        `,
        author: articleData.author,
        postedAt: articleData.postedAt,
        readCount: articleData.readCount,
        tags: articleData.tags,
        likesCount: articleData.likesCount,
        commentsCount: articleData.commentsCount,
        sharesCount: articleData.sharesCount,
        recommendations: articleData.recommendations,
    };
}

const ArticlePage: React.FC<{ params: { slug: string } }> = async ({ params }) => {
    const { slug } = params;
    const article = await fetchArticle(slug); // Fetch the article based on the slug

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{article.title}</h1>
                <p className="text-gray-600 text-sm md:text-base">
                    By {article.author} on {article.postedAt} | {article.readCount} reads
                </p>
                <div className="flex justify-center items-center space-x-4 my-4">
                    <button
                        className="relative flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                        <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5 mr-1"/>
                        Like
                        <span
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">{article.likesCount}</span>
                    </button>
                    <button
                        className="relative flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                        <FontAwesomeIcon icon={faComment} className="h-5 w-5 mr-1"/>
                        Comment
                        <span
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">{article.commentsCount}</span>
                    </button>
                    <button
                        className="relative flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                        <FontAwesomeIcon icon={faShare} className="h-5 w-5 mr-1"/>
                        Share
                        <span
                            className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">{article.sharesCount}</span>
                    </button>
                </div>
            </div>

            <Image
                src={article.featured_image}
                alt={article.title}
                width={600}
                height={300}
                className="mb-4 w-full h-auto"
            />
            <div className="my-6" dangerouslySetInnerHTML={{__html: article.content}}></div>

            <div className="flex justify-center my-4 space-x-2">
                {article.tags.map((tag, index) => (
                    <Link key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm hover:bg-gray-300 transition duration-200" href={`/tags/search?tag=${tag}`}>
                        {tag}
                    </Link>
                ))}
            </div>

            <div className="text-center my-6">
                <h2 className="text-lg md:text-xl font-bold">About the Author</h2>
                <p>{article.author}</p>
            </div>

            <div className="my-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Recommended Articles</h2>
                <ul className="space-y-2">
                    {article.recommendations.map((rec, index) => (
                        <li key={index} className="text-blue-600 hover:underline">
                            <Link href={`/news/${rec.title.toLowerCase().replace(/\s+/g, '-')}`}>{rec.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-center items-center space-x-4 my-4">
                <button
                    className="relative flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                    <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5 mr-1"/>
                    Like
                    <span
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">{article.likesCount}</span>
                </button>
                <button
                    className="relative flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                    <FontAwesomeIcon icon={faComment} className="h-5 w-5 mr-1"/>
                    Comment
                    <span
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">{article.commentsCount}</span>
                </button>
                <button
                    className="relative flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                    <FontAwesomeIcon icon={faShare} className="h-5 w-5 mr-1"/>
                    Share
                    <span
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">{article.sharesCount}</span>
                </button>
            </div>
        </div>
    );
};

export default ArticlePage;
