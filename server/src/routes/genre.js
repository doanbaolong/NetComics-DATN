const express = require("express");
const router = express.Router();

const genreController = require("../app/controllers/GenreController");

router.get("/all", genreController.getGenres);
router.post("/create", genreController.createGenre);
router.get("/:id", genreController.getSingleGenre);
router.get("/slug/:slug", genreController.getSingleGenreBySlug);
router.put("/:id", genreController.updateGenre);
router.delete("/:id", genreController.deleteGenre);

module.exports = router;
