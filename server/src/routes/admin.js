const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddeware");

const adminController = require("../app/controllers/AdminController");

router.post("/signup", adminController.signUp);
router.post("/login", adminController.logIn);
router.get(
  "/me",
  [authMiddleware.isAuthentication],
  adminController.getCurrentAdmin
);

module.exports = router;
