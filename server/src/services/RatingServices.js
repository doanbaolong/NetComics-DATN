const db = require("../app/models/index");

const addRatingService = (rating, userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(rating);
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

module.exports = {
  addRatingService,
};
