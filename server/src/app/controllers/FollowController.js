const followServices = require("../../services/FollowServices");

const getFollowingComic = async (req, res) => {
  try {
    const { page, limit, type } = req.query;
    const userId = req.params.userId;
    const response = await followServices.getFollowingComicService(
      page,
      limit,
      type,
      userId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Follow controller: " + error,
    });
  }
};

const getFollowingComicByComicIds = async (req, res) => {
  try {
    const { page, limit, type, ids } = req.query;
    const comicIds = ids.split(",");
    const response = await followServices.getFollowingComicByComicIdsService(
      page,
      limit,
      type,
      comicIds
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Follow controller: " + error,
    });
  }
};

const getCountFollow = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await followServices.getCountFollowService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Follow controller: " + error,
    });
  }
};

const checkFollowing = async (req, res) => {
  try {
    const { userId, comicId } = req.params;
    const response = await followServices.checkFollowingService(
      userId,
      comicId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Follow controller: " + error,
    });
  }
};

const addFollowingComic = async (req, res) => {
  try {
    const { userId, comicId } = req.params;
    const response = await followServices.addFollowingComicService(
      userId,
      comicId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Author controller: " + error,
    });
  }
};

const deleteFollowingComic = async (req, res) => {
  try {
    const { userId, comicId } = req.params;
    const response = await followServices.deleteFollowingComicService(
      userId,
      comicId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Author controller: " + error,
    });
  }
};

module.exports = {
  getFollowingComic,
  getFollowingComicByComicIds,
  addFollowingComic,
  deleteFollowingComic,
  getCountFollow,
  checkFollowing,
};
