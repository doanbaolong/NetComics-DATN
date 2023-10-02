const db = require("../app/models/index");

const addRatingService = (rating, userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Rating.create({
        userId,
        comicId,
        ...rating,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to rating",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getRatingsService = (comicId, page, limit, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageLimit = +limit;
      if (type === "less") {
        pageLimit = 10;
      } else {
        pageLimit = +limit;
      }
      const response = await db.Rating.findAndCountAll(
        {
          where: { comicId },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              attributes: ["id", "fullName", "avatar"],
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
        msg: response ? "OK" : "Fail to get all Ratings",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addRatingService,
  getRatingsService,
};
