const express = require('express');
const axios = require('axios');
const router = express.Router();

// 新闻 API 的基础 URL
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY; // 从环境变量中获取 API 密钥

// 获取新闻头条
router.get('/', async (req, res) => {
    try {
        // 拼接 URL
        const url = `${NEWS_API_URL}?country=us&apiKey=a47bb87ba1f74dd38ce72acef72bcb52&pageSize=5`;

        const response = await axios.get(url);

        res.json(response.data.articles);
        console.log(response.data.articles)
    } catch (error) {
        console.error('Error fetching news:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching news headlines.', error: error.message });
    }
});

module.exports = router;