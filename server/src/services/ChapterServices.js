const db = require("../app/models/index");
const cloudinary = require("../util/cloudinary");

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
        include: [{ model: db.Comic, attributes: ["id"] }],
        attributes: { exclude: ["cloudIds"] },
      });
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
      const chapter = await db.Chapter.findOne({ where: { id } });
      if (!chapter) {
        resolve({
          err: 1,
          msg: "Chapter không tồn tại",
        });
      } else {
        chapter.view += 1;
        await chapter.save();
        resolve({
          err: 0,
          msg: "View tăng 1",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
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
};
