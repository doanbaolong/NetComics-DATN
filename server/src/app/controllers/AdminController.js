const db = require("../models/index");
const adminServices = require("../../services/AdminServices");

// [POST] /signup
const signUp = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const response = await adminServices.signUpService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at admin controller " + error,
    });
  }
};

// [POST] /login
const logIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const response = await adminServices.logInService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at admin controller " + error,
    });
  }
};

const getCurrentAdmin = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await adminServices.getCurrentAdminService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  getCurrentAdmin,
};
