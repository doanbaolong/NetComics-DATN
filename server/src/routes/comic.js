const express = require("express");
const router = express.Router();

const comicController = require("../app/controllers/ComicController");

router.get("/all", comicController.getComics);
router.get("/limit", comicController.getComicsLimit);
router.get("/limit/:genre", comicController.getComicsByGenreLimit);
router.get("/search", comicController.searchComics);
router.post("/create", comicController.upload, comicController.createComic);
router.get("/:id", comicController.getSingleComic);
router.get("/slug/:slug", comicController.getSingleComicBySlug);
router.put("/:id", comicController.upload, comicController.updateComic);
router.delete("/:id", comicController.deleteComic);

module.exports = router;
