const userServices = require("../../services/UserService");
const db = require("../models/index");

class UserController {
  // [GET]
  async getAllUsers(req, res) {
    try {
      const response = await userServices.getAllUsers();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at user controller: " + error,
      });
    }
  }
}

module.exports = new UserController();
