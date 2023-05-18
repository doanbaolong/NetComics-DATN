const express = require("express");
const router = express.Router();

const commentController = require("../app/controllers/CommentController");

router.get("/:chapterId", commentController.getCommentsByChapter);
module.exports = router;
