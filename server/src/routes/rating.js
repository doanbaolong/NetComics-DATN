const express = require("express");
const router = express.Router();

const ratingController = require("../app/controllers/RatingController");

// router.get("/:id", historyController.getHistory);
router.post("/:userId/:comicId", ratingController.addRating);

module.exports = router;
