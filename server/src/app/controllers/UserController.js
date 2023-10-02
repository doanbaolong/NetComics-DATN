const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
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

const updateUser = async (req, res) => {
  try {
    const { fullName, email, userName, address, gender } = req.body;
    let id = req.params.id;
    if (!fullName || !email || !userName)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const info = {
      fullName,
      email,
      userName,
      address,
      avatar: req.file
        ? "/uploads/avatars/" + req.file.filename
        : req.body.avatar || null,
    };
    if (gender !== -1) {
      info.gender = gender;
    }
    const response = await userServices.updateUserService(info, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    let id = req.params.id;
    if (!oldPassword || !newPassword)
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    const response = await userServices.changePasswordService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};

const lockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await userServices.lockUserService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at User controller: " + error,
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/avatars/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: "2097152" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("avatar");

module.exports = {
  getAllUsers,
  updateUser,
  lockUser,
  upload,
  changePassword,
};
