const db = require("../app/models/index");

class GenreServices {
  // Get all genres
  getGenres() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Genre.findAll(
          { order: [["name", "ASC"]] },
          { raw: true }
        );
        resolve({
          err: response ? 0 : 1,
          msg: response ? "Success" : "Fail to get all genres",
          response,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new GenreServices();
