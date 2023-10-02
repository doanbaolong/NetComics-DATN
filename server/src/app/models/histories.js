"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Comic, { foreignKey: "comicId" });
      History.belongsTo(models.Chapter, { foreignKey: "chapterId" });
    }
  }
  History.init(
    {
      userId: DataTypes.INTEGER,
      comicId: DataTypes.INTEGER,
      chapterIds: DataTypes.TEXT,
      chapterId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
