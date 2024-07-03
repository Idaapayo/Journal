'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: "test user",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        username: "test user2",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
