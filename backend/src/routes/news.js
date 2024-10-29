const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// 定义新闻的根路由，调用控制器中的获取新闻函数
router.get('/', newsController.getNews);

module.exports = router;
