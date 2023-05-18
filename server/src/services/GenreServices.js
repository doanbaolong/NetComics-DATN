const { Op } = require("sequelize");
const db = require("../app/models/index");

// Get all genres
const getGenresService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Genre.findAll(
        { order: [["updatedAt", "DESC"]] },
        { raw: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all genres",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const creatGenreService = ({ name, description, slug }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.Genre.count({
        where: {
          slug,
        },
      });

      if (count > 0) {
        resolve({
          err: 2,
          msg: "Thể loại đã tồn tại",
        });
      } else {
        const response = await db.Genre.create({ name, description, slug });
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

const getSingleGenreService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Genre.findOne({
        where: { id },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Thể loại không tồn tại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getSingleGenreBySlugService = (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Genre.findOne({
        where: { slug },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Thể loại không tồn tại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateGenreService = (genre, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.Genre.count({
        where: { slug: genre.slug, id: { [Op.ne]: id } },
      });
      if (count > 0) {
        resolve({
          err: 2,
          msg: "Thể loại đã tồn tại",
        });
      } else {
        await db.Genre.update(genre, { where: { id } });
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

const deleteGenreService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Genre.destroy({ where: { id: id } });

      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No genre delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getGenresService,
  creatGenreService,
  getSingleGenreService,
  getSingleGenreBySlugService,
  updateGenreService,
  deleteGenreService,
};
