const redisClient = require("../app/config/redis");

const cacheComic = async (req, res, next) => {
  const key = `comic:${req.params.id}`;

  const response = await redisClient.get(key);
  if (response) {
    return res.status(200).json(JSON.parse(response));
  } else {
    next();
  }
};

const cacheChapter = async (req, res, next) => {
  const key = `chapter:${req.params.id}`;

  const response = await redisClient.get(key);
  if (response) {
    return res.status(200).json(JSON.parse(response));
  } else {
    next();
  }
};

module.exports = { cacheComic, cacheChapter };
