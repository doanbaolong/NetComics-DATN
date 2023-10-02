const express = require("express");
const router = express.Router();

const ratingController = require("../app/controllers/RatingController");

router.get("/:comicId", ratingController.getRatings);
router.post("/:userId/:comicId", ratingController.addRating);

module.exports = router;
