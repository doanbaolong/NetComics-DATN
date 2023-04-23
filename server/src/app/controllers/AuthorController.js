const authorServices = require("../../services/AuthorService");

class AuthorController {
  async getAuthors(req, res) {
    try {
      const response = await authorServices.getAuthorsService();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at Author controller: " + error,
      });
    }
  }

  async createAuthor(req, res) {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({
          err: 1,
          msg: "Missing input",
        });
      const response = await authorServices.creatAuthorService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at Author controller: " + error,
      });
    }
  }

  async getSingleAuthor(req, res) {
    try {
      const id = req.params.id;
      const response = await authorServices.getSingleAuthorService(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at Author controller: " + error,
      });
    }
  }

  async updateAuthor(req, res) {
    try {
      const { name } = req.body;
      const id = req.params.id;
      if (!name)
        return res.status(400).json({
          err: 1,
          msg: "Missing input",
        });
      const response = await authorServices.updateAuthorService(req.body, id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at Author controller: " + error,
      });
    }
  }

  async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      const response = await authorServices.deleteAuthorService(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at Author controller: " + error,
      });
    }
  }
}

module.exports = new AuthorController();
