const bcrypt = require("bcryptjs");
const db = require("../app/models/index");
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(10);

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Fail to get all users",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserService = (user, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userFindByUserName = await db.User.findOne({
        where: { userName: user.userName, id: { [Op.ne]: id } },
      });
      if (userFindByUserName) {
        resolve({
          err: 2,
          msg: "Tên tài khoản đã tồn tại",
        });
      } else {
        const userFindByEmail = await db.User.findOne({
          where: { email: user.email, id: { [Op.ne]: id } },
        });
        if (userFindByEmail) {
          resolve({
            err: 2,
            msg: "Email đã được sử dụng",
          });
        } else {
          const response = await db.User.update(
            { ...user },
            { where: { id: id } }
          );
          resolve({
            err: 0,
            msg: "Updated",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const changePasswordService = ({ oldPassword, newPassword }, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(oldPassword, response.password);
      if (!isCorrectPassword) {
        resolve({
          err: 2,
          msg: "Mật khẩu không chính xác",
        });
      } else {
        const hashPw = await hashPassword(newPassword);
        response.password = hashPw;
        await response.save();
        resolve({
          err: 0,
          msg: "Change password successfully",
        });
      }
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

const lockUserService = (data, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userFind = await db.User.findOne({
        where: { id },
      });
      if (!userFind) {
        resolve({
          err: 2,
          msg: "Người dùng không tồn tại",
        });
      } else {
        await db.User.update(data, { where: { id: id } });
        resolve({
          err: 0,
          msg: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUsers,
  updateUserService,
  lockUserService,
  changePasswordService,
};
