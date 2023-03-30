const express = require("express");
const router = express.Router();

const genreController = require("../app/controllers/GenreController");

router.get("/all", genreController.getGenres);

module.exports = router;
