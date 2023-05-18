"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Comic, {
        through: models.History,
        as: "histories",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Comic, {
        through: models.Follow,
        as: "follows",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Comic, {
        through: models.Rating,
        as: "ratings",
        foreignKey: "userId",
      });
      User.hasMany(models.Rating, { foreignKey: "userId" });

      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Reply, { foreignKey: "userId" });
      User.hasMany(models.Notification, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
      status: DataTypes.STRING,
      statusMessage: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      emailToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
