const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const authController = require("../app/controllers/AuthController");

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
router.post("/verify-email", authController.verifyEmail);
router.post("/send-email", authController.sendMail);
router.get(
  "/me",
  [authMiddleware.isAuthentication],
  authController.getCurrentUser
);

module.exports = router;
