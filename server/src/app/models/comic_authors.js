"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comic_Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comic_Author.init(
    {
      comicId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comic_Author",
    }
  );
  return Comic_Author;
};
