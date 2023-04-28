const express = require("express");
const router = express.Router();

const chapterController = require("../app/controllers/ChapterController");

router.get("/all", chapterController.getChapters);
router.post(
  "/create",
  chapterController.upload,
  chapterController.createChapter
);
router.get("/:id", chapterController.getSingleChapter);
router.put("/:id", chapterController.upload, chapterController.updateChapter);
router.delete("/:id", chapterController.deleteChapter);

module.exports = router;
