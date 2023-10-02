const express = require("express");
const router = express.Router();

const historyController = require("../app/controllers/HistoryController");

router.get("/ids", historyController.getHistoryByComicIds);
router.get("/:userId", historyController.getHistory);
router.post("/:userId/:comicId", historyController.addHistory);
router.delete("/:userId/:comicId", historyController.deleteHistory);

module.exports = router;
