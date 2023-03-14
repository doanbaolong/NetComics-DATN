'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Doan',
      lastName: 'Long',
      email: 'doanlong@gmail.com',
      userName: 'doanlong',
      password: '12345',
      address: 'Hải Phòng',
      gender: 1,
      avatar: 'user1.png',
      role: 'ADM',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
