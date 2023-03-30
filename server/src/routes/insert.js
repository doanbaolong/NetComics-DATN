const express = require("express");
const router = express.Router();

const insertController = require("../app/controllers/InsertController");

router.post("/", insertController.insert);

module.exports = router;
