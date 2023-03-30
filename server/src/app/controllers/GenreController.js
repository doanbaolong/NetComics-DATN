const genreServices = require("../../services/GenreServices");

class GenreController {
  async getGenres(req, res) {
    try {
      const response = await genreServices.getGenres();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at genre controller: " + error,
      });
    }
  }
}

module.exports = new GenreController();
