'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComicGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ComicGenre.init({
    comicId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ComicGenre',
  });
  return ComicGenre;
};