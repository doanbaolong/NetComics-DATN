const db = require("../models/index");
const authServices = require("../../services/AuthServices");
const { sendVerificationMail } = require("../../util/sendVerificationMail");

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

const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await authServices.getCurrentUserService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller: " + error,
    });
  }
};

const sendMail = async (req, res) => {
  const user = req.body;
  try {
    await sendVerificationMail(user);
    return res
      .status(200)
      .json({ err: 0, msg: "Send verification email successfully" });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller: " + error,
    });
  }
};

const verifyEmail = async (req, res) => {
  const emailToken = req.body.emailToken;
  try {
    const response = await authServices.verifyEmailService(emailToken);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller: " + error,
    });
  }
};

module.exports = {
  signUp,
  logIn,
  getCurrentUser,
  verifyEmail,
  sendMail,
};
