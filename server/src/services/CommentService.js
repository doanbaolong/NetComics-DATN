const db = require("../app/models/index");

const getCommentsByComicService = (page, limit, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comment.findAndCountAll(
        {
          where: { comicId },
          order: [["createdAt", "DESC"]],
          attributes: [
            "id",
            "userId",
            "comicId",
            "chapterId",
            "content",
            "createdAt",
            "updatedAt",
          ],
          include: [
            { model: db.Chapter, attributes: ["id", "chapterNumber"] },
            { model: db.User, attributes: ["id", "fullName", "avatar"] },
            {
              model: db.Reply,
              order: [["createdAt", "DESC"]],
              attributes: [
                "id",
                "commentId",
                "userId",
                "comicId",
                "chapterId",
                "content",
                "createdAt",
                "updatedAt",
              ],
              include: [
                { model: db.Chapter, attributes: ["id", "chapterNumber"] },
                { model: db.User, attributes: ["id", "fullName", "avatar"] },
              ],
            },
          ],
          offset: page * +limit || 0,
          limit: +limit,
          distinct: true,
        },
        { raw: true },
        { nest: true }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all comments",
        response: { ...response, limit: +limit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCommentsByChapterService = (page, limit, chapterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comment.findAndCountAll(
        {
          where: { chapterId },
          order: [["createdAt", "DESC"]],
          attributes: [
            "id",
            "userId",
            "comicId",
            "chapterId",
            "content",
            "createdAt",
            "updatedAt",
          ],
          include: [
            { model: db.Chapter, attributes: ["id", "chapterNumber"] },
            { model: db.User, attributes: ["id", "fullName", "avatar"] },
            {
              model: db.Reply,
              order: [["createdAt", "DESC"]],
              attributes: [
                "id",
                "commentId",
                "userId",
                "comicId",
                "chapterId",
                "content",
                "createdAt",
                "updatedAt",
              ],
              include: [
                { model: db.Chapter, attributes: ["id", "chapterNumber"] },
                { model: db.User, attributes: ["id", "fullName", "avatar"] },
              ],
            },
          ],
          offset: page * +limit || 0,
          limit: +limit,
          distinct: true,
        },
        { raw: true },
        { nest: true }
      );

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all comments",
        response: { ...response, limit: +limit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCommentsByComicService,
  getCommentsByChapterService,
};
