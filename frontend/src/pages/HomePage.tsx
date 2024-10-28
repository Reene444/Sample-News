// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsList from './components/News/NewsList';

import MarqueeDemo from "../pages/components/MarqueeDemo"; // 导入 NewsList 组件

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

const HomePage: React.FC = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/news'); // request through proxy :localhost:3000/
                setNewsArticles(response.data);
            } catch (err) {
                setError('Error fetching news');
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <h1>Latest News</h1>
            <MarqueeDemo/>
            {error && <p>{error}</p>} {/* error information */}
            <NewsList articles={newsArticles} />
        </div>
    );
};

export default HomePage;
