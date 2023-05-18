const db = require("../app/models/index");

const getFollowingComicService = (page, limit, type, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const follows = await db.Follow.findAll({ where: { userId: userId } });
      const comicIds = follows.map((follow) => follow.comicId);

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
        msg: response ? "OK" : "Fail to get following comics",
        response: { ...response, limit: pageLimit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getFollowingComicByComicIdsService = (page, limit, type, ids) => {
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
        msg: response ? "OK" : "Fail to get following comics",
        response: { ...response, limit: pageLimit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCountFollowService = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comic = await db.Comic.findOne({ where: { slug } });
      resolve({
        err: comic ? 0 : 1,
        msg: comic ? "OK" : "Fail to get following comics",
        response: comic.follower,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const checkFollowingService = (userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Follow.findOne({ where: { userId, comicId } });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Following" : "Not following",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const addFollowingComicService = (userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Follow.create({
        userId,
        comicId,
      });
      if (response) {
        const comic = await db.Comic.findOne({ where: { id: comicId } });
        await db.Comic.update(
          { follower: comic.follower + 1 },
          { where: { id: comicId } }
        );
        resolve({
          err: 0,
          msg: "OK",
          response,
        });
      } else {
        resolve({
          err: 1,
          msg: "Fail to follow comic",
          response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteFollowingComicService = (userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Follow.destroy({ where: { userId, comicId } });

      if (response) {
        const comic = await db.Comic.findOne({ where: { id: comicId } });
        await db.Comic.update(
          { follower: comic.follower - 1 },
          { where: { id: comicId } }
        );
        resolve({
          err: 0,
          msg: "OK",
          response,
        });
      } else {
        resolve({
          err: 1,
          msg: "No following delete",
          response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getFollowingComicService,
  getFollowingComicByComicIdsService,
  addFollowingComicService,
  deleteFollowingComicService,
  getCountFollowService,
  checkFollowingService,
};
