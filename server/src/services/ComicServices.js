const db = require("../app/models/index");
const { Op } = require("sequelize");
const fs = require("fs");

const getComicsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comic.findAll(
        {
          order: [["createdAt", "DESC"]],
          include: [
            { model: db.Author, attributes: ["id", "name"] },
            {
              model: db.Genre,
              attributes: ["id", "name"],
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
            { model: db.Author, attributes: ["id", "name"] },
            {
              model: db.Genre,
              attributes: ["id", "name"],
            },
            {
              model: db.Chapter,
            },
          ],
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
  creatComicService,
  getSingleComicService,
  updateComicService,
  deleteComicService,
};
