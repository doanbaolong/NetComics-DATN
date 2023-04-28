const db = require("../app/models/index");
const cloudinary = require("../util/cloudinary");

const getChaptersService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Chapter.findAll(
        { order: [["createdAt", "DESC"]] },
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
      const response = await db.Chapter.create(data);
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to create Chapter",
        response,
      });
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

const updateChapterService = (chapter, id) => {
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

      await db.Chapter.update(chapter, { where: { id: id } });
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
};
