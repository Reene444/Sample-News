const newsService = require('../services/newsService');
const apicache = require('apicache');
const cache = apicache.middleware;

const getNews = async (req, res) => {
    try {
        const articles = await newsService.fetchNews();
        res.json(articles);
    } catch (error) {
        console.error(`Error fetching news:`, error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching news headlines.', error: error.message });
    }
};

module.exports = { getNews };
