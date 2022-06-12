const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/store/blogs', meController.storedBlog);
router.get('/trash/blogs', meController.trashBlog);

module.exports = router;