"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.User, { foreignKey: "userId" });
      Reply.belongsTo(models.Comic, { foreignKey: "comicId" });
      Reply.belongsTo(models.Chapter, { foreignKey: "chapterId" });
      Reply.belongsTo(models.Comment, { foreignKey: "commentId" });
    }
  }
  Reply.init(
    {
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      comicId: DataTypes.INTEGER,
      chapterId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Reply",
    }
  );
  return Reply;
};
