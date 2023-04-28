const express = require("express");
const router = express.Router();

const comicController = require("../app/controllers/ComicController");

router.get("/all", comicController.getComics);
router.post("/create", comicController.upload, comicController.createComic);
router.get("/:id", comicController.getSingleComic);
router.put("/:id", comicController.upload, comicController.updateComic);
router.delete("/:id", comicController.deleteComic);

module.exports = router;
