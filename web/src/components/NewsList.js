import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/news`);
                console.log("-----------RE:"+response.toString())
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError('Could not fetch news headlines.');
            }
        };

        fetchNews();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="news-list">
            {news.length > 0 ? (
                news.map((article, index) => (
                    <div key={index} className="news-item">
                        <h2>{article.title}</h2>
                        <p>Source: {article.source.name}</p>
                        <p>Published: {new Date(article.publishedAt).toLocaleString()}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default NewsList;
