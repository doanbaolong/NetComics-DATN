const db = require("../app/models/index");
const { Op } = require("sequelize");
const fs = require("fs");
const cloudinary = require("../util/cloudinary");

const getComicsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comic.findAll(
        {
          order: [["updatedAt", "DESC"]],
          include: [
            { model: db.Author, attributes: ["id", "name"] },
            {
              model: db.Genre,
              attributes: ["id", "name"],
            },
            {
              model: db.Chapter,
              attributes: ["id", "chapterNumber", "updatedAt"],
              limit: 3,
              order: [["chapterNumber", "DESC"]],
            },
          ],
        },
        { raw: true },
        { nest: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all Comics",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getComicsLimitService = (page, limit, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queries = {};
      if (query.minchapter) {
        queries.where = {
          ...queries.where,
          chapterNumber: { [Op.gte]: query.minchapter },
        };
      }
      if (query.status) {
        queries.where = {
          ...queries.where,
          status: { [Op.eq]: query.status },
        };
      }

      let order = "chapterUpdatedAt";
      if (query.sort) {
        order = query.sort;
      }

      let genreIdArr = [];
      let nogenreIdArr = [];

      if (query.genre) {
        const arr = await db.Comic_Genre.findAll({
          where: { genreId: { [Op.in]: query.genre } },
        });
        genreIdArr = [...new Set(arr.map((item) => item.comicId))];
      }
      if (query.nogenre) {
        const arr = await db.Comic_Genre.findAll({
          where: { genreId: { [Op.in]: query.nogenre } },
        });
        nogenreIdArr = [...new Set(arr.map((item) => item.comicId))];
      }

      if (query.genre && !query.nogenre) {
        queries.where = {
          ...queries.where,
          id: { [Op.in]: genreIdArr },
        };
      } else if (query.nogenre && !query.genre) {
        queries.where = {
          ...queries.where,
          id: { [Op.notIn]: nogenreIdArr },
        };
      } else if (query.genre && query.nogenre) {
        const comicIds = genreIdArr.filter(
          (genreId) => !nogenreIdArr.includes(genreId)
        );
        queries.where = {
          ...queries.where,
          id: { [Op.in]: comicIds },
        };
      }

      const response = await db.Comic.findAndCountAll(
        {
          ...queries,
          order: [[order, "DESC"]],
          include: [
            { model: db.Author, attributes: ["id", "name"] },
            {
              model: db.Genre,
              attributes: ["id", "name"],
            },
            {
              model: db.Chapter,
              attributes: ["id", "chapterNumber", "chapterUpdatedAt"],
              limit: 3,
              order: [["chapterNumber", "DESC"]],
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
        msg: response ? "OK" : "Fail to get all Comics",
        response: { ...response, limit: +limit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const searchComicsService = (page, limit, type, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queries = [];
      if (query.keyword) {
        queries = [
          ...queries,
          { name: { [Op.substring]: `${query.keyword}` } },
        ];
        queries = [
          ...queries,
          { otherName: { [Op.substring]: `${query.keyword}` } },
        ];
      }

      let pageLimit = +limit;
      if (type === "less") {
        pageLimit = 10;
      } else {
        pageLimit = +limit;
      }

      const response = await db.Comic.findAndCountAll(
        {
          where: {
            [Op.or]: [...queries],
          },
          order: [["chapterUpdatedAt", "DESC"]],
          include: [
            {
              model: db.Author,
              attributes: ["id", "name"],
            },
            {
              model: db.Genre,
              attributes: ["id", "name"],
            },
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
        msg: response ? "OK" : "Fail to get all Comics",
        response: { ...response, limit: pageLimit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getComicsLimitByGenreService = (page, limit, genre) => {
  return new Promise(async (resolve, reject) => {
    try {
      const genreFind = await db.Genre.findOne({ where: { slug: genre } });
      if (!genreFind) {
        resolve({
          err: 2,
          msg: "Thể loại không tồn tại",
        });
      }
      const response = await db.Comic.findAndCountAll(
        {
          include: [
            {
              model: db.Genre,
              attributes: ["id", "name", "description"],
              where: { id: genreFind?.id },
            },
            {
              model: db.Chapter,
              attributes: ["id", "chapterNumber", "chapterUpdatedAt"],
              limit: 3,
              order: [["chapterNumber", "DESC"]],
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
        msg: response ? "OK" : "Fail to get all Comics",
        response: { ...response, limit: +limit },
      });
    } catch (error) {
      reject(error);
    }
  });
};

const creatComicService = ({ authors, genres, ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comic.create({ ...data });
      if (!response) {
        resolve({
          err: 1,
          msg: "Failed to create comic",
        });
      } else {
        if (authors.length > 0) {
          authors.forEach(
            async (author) =>
              await db.Comic_Author.create({
                comicId: response.id,
                authorId: author,
              })
          );
        }

        if (genres.length > 0) {
          genres.forEach(
            async (genre) =>
              await db.Comic_Genre.create({
                comicId: response.id,
                genreId: genre,
              })
          );
        }

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

const getSingleComicService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comic.findOne(
        {
          where: { id },
          include: [
            {
              model: db.Author,
              attributes: ["id", "name"],
            },
            {
              model: db.Genre,
              attributes: ["id", "name", "slug"],
            },
            {
              model: db.Chapter,
            },
            {
              model: db.Rating,
              order: [["createdAt", "DESC"]],
              include: {
                model: db.User,
                attributes: ["id", "fullName", "avatar"],
              },
            },
            {
              model: db.User,
              as: "follows",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "histories",
              attributes: ["id"],
            },
          ],
          order: [[{ model: db.Chapter }, "chapterNumber", "DESC"]],
        },
        { raw: true },
        { nest: true }
      );
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

const getSingleComicBySlugService = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comic.findOne(
        {
          where: { slug },
          include: [
            {
              model: db.Author,
              attributes: ["id", "name"],
            },
            {
              model: db.Genre,
              attributes: ["id", "name", "slug"],
            },
            {
              model: db.Chapter,
            },
            {
              model: db.Rating,
              order: [["createdAt", "DESC"]],
              include: {
                model: db.User,
                attributes: ["id", "fullName", "avatar"],
              },
            },
            {
              model: db.User,
              as: "follows",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "histories",
              attributes: ["id"],
            },
          ],
          order: [[{ model: db.Chapter }, "chapterNumber", "DESC"]],
        },
        { raw: true },
        { nest: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Truyện không tồn tại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateComicService = (comic, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comicFind = await db.Comic.findOne({
        where: { slug: comic.slug, id: { [Op.ne]: id } },
      });
      if (comicFind) {
        resolve({
          err: 2,
          msg: "Truyện đã tồn tại",
        });
      } else {
        await db.Comic.update(comic, { where: { id } });

        await db.Comic_Author.destroy({
          where: { comicId: id },
        });

        await db.Comic_Genre.destroy({
          where: { comicId: id },
        });

        if (comic.authors.length > 0) {
          comic.authors.forEach(
            async (author) =>
              await db.Comic_Author.create({
                comicId: id,
                authorId: author,
              })
          );
        }

        if (comic.genres.length > 0) {
          comic.genres.forEach(
            async (genre) =>
              await db.Comic_Genre.create({
                comicId: id,
                genreId: genre,
              })
          );
        }

        resolve({
          err: 0,
          msg: "Updated",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteComicService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapters = await db.Chapter.findAll({ where: { comicId: id } });
      for (let chapter of chapters) {
        let publicIds = [];
        if (chapter.cloudIds) {
          publicIds = JSON.parse(chapter.cloudIds);

          for (let publicId of publicIds) {
            await cloudinary.destroy(publicId);
          }
        }
      }
      await db.Chapter.destroy({ where: { comicId: id } });
      await db.Comic_Author.destroy({ where: { comicId: id } });
      await db.Comic_Genre.destroy({ where: { comicId: id } });
      const response = await db.Comic.destroy({ where: { id: id } });

      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No Comic delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getComicsService,
  getComicsLimitService,
  getComicsLimitByGenreService,
  searchComicsService,
  creatComicService,
  getSingleComicService,
  getSingleComicBySlugService,
  updateComicService,
  deleteComicService,
};
