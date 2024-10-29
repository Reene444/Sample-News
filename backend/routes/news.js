const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY; // API key

router.get('/', async (req, res) => {
    try {
        const url = `${NEWS_API_URL}?country=us&apiKey=${API_KEY}&pageSize=20`;
        const response = await axios.get(url);
        res.json(response.data.articles);
      //  console.log(response.data.articles)
    } catch (error) {
        console.error(`Error fetching news:`, error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching news headlines.', error: error.message });
    }
});

module.exports = router;
