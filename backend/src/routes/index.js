const express = require('express');
const newsRouter = require('./news');
const apicache = require('apicache')
const router = express.Router();
const cache = apicache.middleware;
router.use('/news',cache('5 minutes'),newsRouter);  // Centrally manage news routing


module.exports = router;
