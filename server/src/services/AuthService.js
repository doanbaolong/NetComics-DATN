const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../app/models/index");
require("dotenv").config();

class AuthService {
  async signUpService({ fullName, email, userName, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        let hashPassword = await this.hashPassword(password);
        const response = await db.User.findOrCreate({
          where: {
            userName,
          },
          defaults: {
            fullName,
            email,
            userName,
            password: hashPassword,
            role: "USR",
          },
        });

        const token =
          response[1] &&
          jwt.sign(
            { id: response[0].id, userName: response[0].userName },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
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
  }

  async logInService({ userName, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.User.findOne({
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
            { id: response.id, userName: response.userName },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
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
  }

  async hashPassword(password) {
    return new Promise((resolve, reject) => {
      try {
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new AuthService();
