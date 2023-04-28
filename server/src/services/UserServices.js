const bcrypt = require("bcryptjs");
const db = require("../app/models/index");

const salt = bcrypt.genSaltSync(10);

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await db.User.findAll({
        raw: true,
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

const creatUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await hashPassword(data.password);
      await db.User.create({
        fullName: data.fullName,
        email: data.email,
        userName: data.userName,
        password: hash,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        avatar: data.avatar,
        role: data.role,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUsers,
  creatUser,
};
