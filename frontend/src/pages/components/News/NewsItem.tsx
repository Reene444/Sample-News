// src/components/NewsItem.tsx
import React from 'react';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

const NewsItem: React.FC<NewsArticle> = ({ title, description, url, urlToImage }) => {
    return (
        <li>
            <h2>{title}</h2>
            <p>{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
            {urlToImage && <img src={urlToImage} alt={title} />}
        </li>
    );
};

export default NewsItem;
