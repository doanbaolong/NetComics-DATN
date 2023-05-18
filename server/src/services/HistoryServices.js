const db = require("../app/models/index");

const getHistoryService = (page, limit, type, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comics = await db.History.findAll({ where: { userId: userId } });
      const comicIds = comics.map((comic) => comic.comicId);

      let pageLimit = +limit;
      if (type === "less") {
        pageLimit = 5;
      } else {
        pageLimit = +limit;
      }

      const response = await db.Comic.findAndCountAll(
        {
          where: { id: comicIds },
          include: [
            {
              model: db.Chapter,
              attributes: ["id", "chapterNumber", "chapterUpdatedAt"],
              limit: 3,
              order: [["chapterNumber", "DESC"]],
            },
          ],
          offset: page * pageLimit || 0,
          limit: pageLimit,
          distinct: true,
        },
        { raw: true },
        { nest: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get history",
        response: { ...response, limit: pageLimit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getHistoryByComicIdsService = (page, limit, type, ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageLimit = +limit;
      if (type === "less") {
        pageLimit = 5;
      } else {
        pageLimit = +limit;
      }
      const response = await db.Comic.findAndCountAll(
        {
          where: { id: ids },
          include: [
            {
              model: db.Chapter,
              attributes: ["id", "chapterNumber", "chapterUpdatedAt"],
              limit: 3,
              order: [["chapterNumber", "DESC"]],
            },
          ],
          offset: page * pageLimit || 0,
          limit: pageLimit,
          distinct: true,
        },
        { raw: true },
        { nest: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get history",
        response: { ...response, limit: pageLimit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const addHistoryService = (userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.History.count({ where: { userId, comicId } });

      if (count > 0) {
        resolve({
          err: 2,
          msg: "Truyện đã có trong lịch sử đọc",
        });
      } else {
        const response = await db.History.create({
          userId,
          comicId,
        });
        resolve({
          err: 0,
          msg: "OK",
          response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteHistoryService = (userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.History.destroy({
        where: { userId, comicId },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No following delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getHistoryService,
  getHistoryByComicIdsService,
  addHistoryService,
  deleteHistoryService,
};
