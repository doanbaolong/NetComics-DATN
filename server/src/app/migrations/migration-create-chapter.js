"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chapters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comicId: {
        type: Sequelize.INTEGER,
      },
      chapterNumber: {
        type: Sequelize.FLOAT,
      },
      title: {
        type: Sequelize.STRING,
      },
      pictureUrls: {
        type: Sequelize.TEXT,
      },
      cloudIds: {
        type: Sequelize.TEXT,
      },
      view: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      chapterUpdatedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("chapters");
  },
};
