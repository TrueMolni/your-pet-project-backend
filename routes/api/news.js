const express = require('express');

const router = express.Router();

const { getAllNews, getNewsByTitle } = require('../../controllers/news/index');

router.get('/', getAllNews);

router.get('/:title', getNewsByTitle);

module.exports = router;
