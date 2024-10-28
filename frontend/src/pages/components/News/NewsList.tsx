// src/components/NewsList.tsx
import React from 'react';
import NewsItem from './NewsItem';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

interface NewsListProps {
    articles: NewsArticle[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
    return (
        <ul>
            {articles.map((article) => (
                <NewsItem key={article.url} {...article} />
                ))}
        </ul>
    );
};

export default NewsList;
