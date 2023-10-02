const bcrypt = require("bcryptjs");
const db = require("../app/models/index");
require("dotenv").config();
const slugify = require("slugify");
const genresData = require("../../data/genres.json");

const insertService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      genresData.forEach(async (item) => {
        let slug = slugify(item?.name, { lower: true });
        await db.Genre.create({
          name: item?.name,
          description: item?.description,
          slug: slug,
        });
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertService,
};
