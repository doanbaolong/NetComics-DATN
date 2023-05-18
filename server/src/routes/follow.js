const express = require("express");
const router = express.Router();

const followController = require("../app/controllers/FollowController");

router.get("/ids", followController.getFollowingComicByComicIds);
router.get("/:userId", followController.getFollowingComic);
router.get("/count/:slug", followController.getCountFollow);
router.post("/:userId/:comicId", followController.addFollowingComic);
router.post(
  "/check-following/:userId/:comicId",
  followController.checkFollowing
);
router.delete("/:userId/:comicId", followController.deleteFollowingComic);

module.exports = router;
