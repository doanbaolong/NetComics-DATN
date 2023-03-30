const bcrypt = require("bcryptjs");
const db = require("../app/models/index");
require("dotenv").config();
const slugify = require("slugify");
const genresData = require("../../data/genres.json");

class InsertServices {
  async insertService() {
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
  }

  async hashPassword(password) {
    return new Promise((resolve, reject) => {
      try {
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new InsertServices();
