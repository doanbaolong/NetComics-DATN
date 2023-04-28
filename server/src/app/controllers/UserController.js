const userServices = require("../../services/UserServices");
const db = require("../models/index");

// [GET]
const getAllUsers = async (req, res) => {
  try {
    const response = await userServices.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};

module.exports = { getAllUsers };
