const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../app/models/index");
require("dotenv").config();

const signUpService = async ({ userName, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPw = await hashPassword(password);
      const response = await db.Admin.findOrCreate({
        where: {
          userName,
        },
        defaults: {
          userName,
          password: hashPw,
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          {
            id: response[0].id,
            userName: response[0].userName,
            role: "admin",
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng ký tài khoản thành công"
          : "Tên tài khoản đã tồn tại",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const logInService = async ({ userName, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Admin.findOne({
        where: {
          userName,
        },
        raw: true,
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          {
            id: response.id,
            userName: response.userName,
            role: "admin",
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Mật khẩu không đúng"
          : "Tài khoản không tồn tại",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCurrentAdminService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await db.Admin.findOne({
        raw: true,
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get current user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  signUpService,
  logInService,
  getCurrentAdminService,
};
