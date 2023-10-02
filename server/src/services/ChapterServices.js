const db = require("../app/models/index");
const cloudinary = require("../util/cloudinary");
const redisClient = require("../app/config/redis");

const getChaptersService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Chapter.findAll(
        {
          order: [["chapterNumber", "DESC"]],
          attributes: { exclude: ["cloudIds"] },
        },
        { raw: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all Chapters",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const creatChapterService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Chapter.create({
        ...data,
        chapterUpdatedAt: Date.now(),
      });
      if (response) {
        const comic = await db.Comic.findOne({
          where: { id: response.comicId },
        });
        await db.Comic.update(
          {
            chapterUpdatedAt: response.chapterUpdatedAt,
            chapterNumber: comic.chapterNumber + 1,
          },
          { where: { id: comic.id } }
        );
        resolve({
          err: 0,
          msg: "OK",
          response,
        });
      } else {
        resolve({
          err: 1,
          msg: "Failed to create Chapter",
          response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getSingleChapterService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Chapter.findOne({
        where: { id },
        include: [
          {
            model: db.Comic,
            attributes: ["id", "name", "chapterUpdatedAt", "slug"],
            include: [
              {
                model: db.Chapter,
                attributes: ["id", "comicId", "chapterNumber", "title"],
              },
              {
                model: db.User,
                as: "histories",
                attributes: ["id"],
              },
            ],
          },
        ],
        attributes: { exclude: ["cloudIds"] },
        order: [[db.Comic, { model: db.Chapter }, "chapterNumber", "DESC"]],
      });

      if (response) {
        redisClient.setEx(
          `chapter:${id}`,
          3600,
          JSON.stringify({
            err: 0,
            msg: "OK",
            response,
          })
        );
      }

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Chapter không tồn tại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const viewChapterService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const chapter = await db.Chapter.findOne({ where: { id } });
      // if (!chapter) {
      //   resolve({
      //     err: 1,
      //     msg: "Chapter không tồn tại",
      //   });
      // } else {
      //   chapter.view += 1;
      //   await chapter.save();
      //   resolve({
      //     err: 0,
      //     msg: "View tăng 1",
      //   });
      // }

      const key = `chapter:${id}:view`;

      const views = await redisClient.get(key);
      if (views) {
        await redisClient.incr(key);
      } else {
        await redisClient.set(key, 1);
      }

      resolve({
        err: 0,
        msg: "viewed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// get view of chapter from Redis
const getViewCount = async (id) => {
  const view = await redisClient.get(`chapter:${id}:view`);
  return parseInt(view) || 0;
};

// update view to db
const updateViewCountToDatabaseService = async (id) => {
  const keys = await redisClient.keys(`chapter:*:view`);

  if (keys && keys.length > 0) {
    keys.forEach(async (key) => {
      const id = key.split(":")[1];

      const view = await getViewCount(id);

      const chapterFind = await db.Chapter.findOne({
        where: { id },
      });
      if (chapterFind) {
        await db.Chapter.update(
          { view: chapterFind.view + view },
          { where: { id } }
        );
        redisClient.del(`comic:${chapterFind.comicId}`);
      }

      // delete data in Redis
      redisClient.del(`chapter:${id}:view`);
    });
  }
};

const updateChapterService = (chapter, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapterFind = await db.Chapter.findOne({
        where: { id: id },
      });

      let publicIds = [];
      if (chapterFind?.cloudIds) {
        publicIds = JSON.parse(chapterFind.cloudIds);

        for (let publicId of publicIds) {
          await cloudinary.destroy(publicId);
        }
      }

      const response = await db.Chapter.update(
        { ...chapter, chapterUpdatedAt: Date.now() },
        { where: { id } }
      );
      await db.Comic.update(
        { chapterUpdatedAt: response.chapterUpdatedAt },
        { where: { id: response.comicId } }
      );
      redisClient.del(`chapter:${id}`);

      resolve({
        err: 0,
        msg: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteChapterService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ChapterFind = await db.Chapter.findOne({
        where: { id: id },
      });

      let publicIds = [];
      if (ChapterFind.cloudIds) {
        publicIds = JSON.parse(ChapterFind.cloudIds);

        for (let publicId of publicIds) {
          await cloudinary.destroy(publicId);
        }
      }
      const comic = await db.Comic.findOne({
        where: { id: ChapterFind.comicId },
      });
      await db.Comic.update(
        {
          chapterNumber: comic.chapterNumber - 1,
        },
        { where: { id: comic.id } }
      );
      await db.Notification.destroy({ where: { chapterId: id } });
      await db.History.destroy({ where: { chapterId: id } });
      redisClient.del(`chapter:${id}`);
      redisClient.del(`chapter:${id}:view`);
      const response = await db.Chapter.destroy({ where: { id: id } });

      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No Chapter delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getChaptersService,
  creatChapterService,
  getSingleChapterService,
  updateChapterService,
  deleteChapterService,
  viewChapterService,
  updateViewCountToDatabaseService,
};
