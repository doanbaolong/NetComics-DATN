const genreServices = require("../../services/GenreServices");

const getGenres = async (req, res) => {
  try {
    const response = await genreServices.getGenresService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at genre controller: " + error,
    });
  }
};

const createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await genreServices.creatGenreService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at genre controller: " + error,
    });
  }
};

const getSingleGenre = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await genreServices.getSingleGenreService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at genre controller: " + error,
    });
  }
};

const updateGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;
    if (!name || !description)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await genreServices.updateGenreService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at genre controller: " + error,
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await genreServices.deleteGenreService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at genre controller: " + error,
    });
  }
};

module.exports = {
  getGenres,
  createGenre,
  getSingleGenre,
  updateGenre,
  deleteGenre,
};
