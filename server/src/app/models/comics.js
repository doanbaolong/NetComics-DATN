"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comic.belongsToMany(models.Author, {
        through: models.Comic_Author,
        foreignKey: "comicId",
      });
      Comic.belongsToMany(models.Genre, {
        through: models.Comic_Genre,
        foreignKey: "comicId",
      });
      Comic.hasMany(models.Chapter, { foreignKey: "comicId" });
    }
  }
  Comic.init(
    {
      name: DataTypes.STRING,
      otherName: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      status: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comic",
    }
  );
  return Comic;
};
