const db = require("../models/index");
const authServices = require("../../services/AuthServices");

// [POST] /signup
const signUp = async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  try {
    if (!fullName || !email || !userName || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });

    const response = await authServices.signUpService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller " + error,
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

    const response = await authServices.logInService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller " + error,
    });
  }
};

module.exports = {
  signUp,
  logIn,
};
