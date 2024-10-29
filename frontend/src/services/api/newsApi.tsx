// src/api/newsApi.ts
import axios from 'axios';

// Fetches news articles
export const fetchNewsArticles = async (): Promise<any> => {
    try {
        const response = await axios.get('/news'); // Assumes proxy setup on localhost:3000
        return response.data;
    } catch (error) {
        throw new Error('Error fetching news');
    }
};
