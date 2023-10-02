const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.get("/all", userController.getAllUsers);
router.put("/:id", userController.upload, userController.updateUser);
router.put("/change-pass/:id", userController.changePassword);
router.put(
  "/lock/:id",
  [authMiddleware.isAuthentication, authMiddleware.isAdmin],
  userController.lockUser
);

module.exports = router;
