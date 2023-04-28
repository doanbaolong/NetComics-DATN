const db = require("../app/models/index");

// Get all genres
const getAuthorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Author.findAll(
        { order: [["createdAt", "DESC"]] },
        { raw: true }
      );
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all authors",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const creatAuthorService = ({ name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.Author.count({
        where: {
          name,
        },
      });

      if (count > 0) {
        resolve({
          err: 2,
          msg: "Tên tác giả đã tồn tại",
        });
      } else {
        const response = await db.Author.create({ name });
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

const getSingleAuthorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Author.findOne({
        where: { id },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Tác giả không tồn tại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateAuthorService = (author, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authorFind = await db.Author.findOne({
        where: { name: author.name },
      });
      if (authorFind) {
        resolve({
          err: 2,
          msg: "Tên tác giả đã tồn tại",
        });
      } else {
        await db.Author.update(author, { where: { id: id } });
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

const deleteAuthorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Author.destroy({ where: { id: id } });

      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No author delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAuthorsService,
  creatAuthorService,
  getSingleAuthorService,
  updateAuthorService,
  deleteAuthorService,
};
