const bcrypt = require("bcryptjs");
const db = require("../app/models/index");

const salt = bcrypt.genSaltSync(10);

class CRUDService {
  async creatUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let hash = await this.hashPassword(data.password);
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
  }

  hashPassword(password) {
    return new Promise(async (resolve, reject) => {
      try {
        let hash = await bcrypt.hashSync(password, salt);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        let users = await db.User.findAll({
          raw: true,
        });
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserById(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: { id: userId },
        });
        if (user) {
          resolve(user);
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  updateUser(user, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.User.update(user, { where: { id: id } });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({ where: { id: id } });
        if (user) {
          await user.destroy();
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new CRUDService();
