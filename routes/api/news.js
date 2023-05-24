const express = require('express');

const router = express.Router();

const { getAllNews } = require('../../controllers/getNews');

router.get('/', getAllNews);

module.exports = router;
