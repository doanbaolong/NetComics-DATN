const express = require("express");
const router = express.Router();

const commentController = require("../app/controllers/CommentController");

router.get("/comic/:comicId", commentController.getCommentsByComic);
router.get("/chapter/:chapterId", commentController.getCommentsByChapter);
module.exports = router;
