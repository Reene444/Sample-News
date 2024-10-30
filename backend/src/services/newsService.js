const axios = require('axios');
const NEWS_API_URL = require('../config/api');
require('dotenv').config();


const fetchNews = async () => {
    const url = `${NEWS_API_URL}?country=us&apiKey=${process.env.NEWS_API_KEY}&pageSize=20`;
    const response = await axios.get(url);
    console.log(response.data)
    return response.data.articles;
};

module.exports = { fetchNews };
