// imports
const express = require("express");

const router = express.Router();
const giphy_words = require("../controllers/giphy_search");

// routing giphy
router.post("/test", giphy_words.search_word);
router.post("/search", giphy_words.search_word_post);
router.post("/like", giphy_words.like_post);
router.post("/all_likes", giphy_words.all_likes_posts);

module.exports = router;
