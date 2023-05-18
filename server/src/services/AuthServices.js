const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../app/models/index");
const { sendVerificationMail } = require("../util/sendVerificationMail");
require("dotenv").config();

const signUpService = async ({ fullName, email, userName, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPw = await hashPassword(password);
      const findByUserName = await db.User.findOne({
        where: {
          userName,
        },
      });
      if (findByUserName) {
        resolve({
          err: 2,
          msg: "Tên tài khoản đã tồn tại",
          token: null,
        });
      } else {
        const findByEmail = await db.User.findOne({
          where: {
            email,
          },
        });

        if (findByEmail) {
          resolve({
            err: 2,
            msg: "Email đã được sử dụng",
            token: null,
          });
        } else {
          const response = await db.User.create({
            fullName,
            email,
            userName,
            password: hashPw,
            emailToken: crypto.randomBytes(64).toString("hex"),
          });

          if (response) {
            await sendVerificationMail(response);
          }
          const token =
            response &&
            jwt.sign(
              {
                id: response.id,
                userName: response.userName,
                email: response.email,
                fullName: response.fullName,
                status: response.status,
                statusMessage: response.statusMessage,
                isVerified: response.isVerified,
                role: "user",
              },
              process.env.SECRET_KEY,
              { expiresIn: "2d" }
            );
          resolve({
            err: 0,
            msg: "Đăng ký tài khoản thành công",
            token: token || null,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const logInService = async ({ userName, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          [Op.or]: [{ userName }, { email: userName }],
        },
        raw: true,
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      if (isCorrectPassword && !response.isVerified) {
        await sendVerificationMail(response);
      }
      const token =
        isCorrectPassword &&
        jwt.sign(
          {
            id: response.id,
            userName: response.userName,
            email: response.email,
            fullName: response.fullName,
            status: response.status,
            statusMessage: response.statusMessage,
            isVerified: response.isVerified,
            role: "user",
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
          : "Tài khoản hoặc email không chính xác",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCurrentUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await db.User.findOne({
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

const verifyEmailService = async (emailToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { emailToken } });
      if (user) {
        user.emailToken = null;
        user.isVerified = true;
        await user.save();

        const token = jwt.sign(
          {
            id: user.id,
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
            status: user.status,
            statusMessage: user.statusMessage,
            isVerified: user.isVerified,
            role: "user",
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
        resolve({
          err: 0,
          msg: "OK",
          token: token || null,
        });
      } else {
        resolve({
          err: 2,
          msg: "Verify failed",
          token: null,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  signUpService,
  logInService,
  getCurrentUserService,
  verifyEmailService,
};
