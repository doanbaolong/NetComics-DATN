const express = require("express");
const router = express.Router();

const authorController = require("../app/controllers/AuthorController");

router.get("/all", authorController.getAuthors);
router.post("/create", authorController.createAuthor);
router.get("/:id", authorController.getSingleAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
