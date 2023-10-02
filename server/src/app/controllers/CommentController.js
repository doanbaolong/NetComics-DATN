const commentServices = require("../../services/CommentService");
const db = require("../models/index");

// [GET]
const getCommentsByComic = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const comicId = req.params.comicId;
    const response = await commentServices.getCommentsByComicService(
      page,
      limit,
      comicId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at comment controller: " + error,
    });
  }
};

const getCommentsByChapter = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const chapterId = req.params.chapterId;
    const response = await commentServices.getCommentsByChapterService(
      page,
      limit,
      chapterId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at comment controller: " + error,
    });
  }
};

module.exports = {
  getCommentsByComic,
  getCommentsByChapter,
};
